import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  App,
  Platform
} from "ionic-angular";
import { LoaderProvider } from "../../providers/loader/loader";
import { AdapterCallsProvider } from "../../providers/adapter-calls/adapter-calls";
import { AlertProvider } from "../../providers/alert/alert";
import { FileOpener } from "@ionic-native/file-opener";
import { File } from "@ionic-native/file";
import { LoggerProvider } from "../../providers/logger/logger";

@IonicPage()
@Component({
  selector: "page-files",
  templateUrl: "files.html"
})
export class FilesPage {
  annexures: any = [];
  noteSheetId;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private adapter: AdapterCallsProvider,
    private loader: LoaderProvider,
    private alert: AlertProvider,
    private platform: Platform,
    private opener: FileOpener,
    private file: File,
    private logger: LoggerProvider
  ) {
    const navData = navParams.data;
    if (navData.data.variables.metaData) {
      const fileNumber = navData.data.variables.metaData.fileNumber;
      this.getListOfAnnexures(fileNumber);
    } else {
    }

    this.noteSheetId = navData.data.variables.noteSheetPDFID;
  }

  ionViewDidLoad() {}

  goToInbox() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  getListOfAnnexures(fileNumber) {
    this.loader.showLoading();
    const params = {
      fileNumber: fileNumber
    };
    const payload = [
      {
        queryParamName: "params",
        queryParamValue: encodeURIComponent(JSON.stringify(params))
      }
    ];
    this.adapter
      .processGetRequest("/adapters/BPM/resource/getAnnexures", payload)
      .then(
        response => {
          this.loader.dismissLoading();
          this.annexures = response.data.data.annexures.items;
        },
        error => {
          this.loader.dismissLoading();
          this.logger.debug(error);
        }
      )
      .catch(error => {
        this.logger.debug(error);
        this.alert.showErrorMessage(716);
      });
  }

  getDocumentContent(documentId, documentName, mimeType) {
    if (documentId) {
      this.loader.showLoading();
      const params = {
        documentId: documentId
      };
      const payload = [
        {
          queryParamName: "params",
          queryParamValue: encodeURIComponent(JSON.stringify(params))
        }
      ];
      this.adapter
        .processGetRequest("/adapters/BPM/resource/getDocumentContent", payload)
        .then(
          response => {
            this.loader.dismissLoading();
            const documentContent = response.data.data.documentContent;
            this.openDocument(documentContent, documentName, mimeType);
          },
          error => {
            this.logger.debug(error);
            this.loader.dismissLoading();
          }
        )
        .catch(error => {
          this.logger.debug(error);
          this.alert.showErrorMessage(715);
        });
    } else {
      this.alert.showErrorMessage(708);
    }
  }

  openDocument(fileContent: string, filename: string, mimeType: string) {
    const writeDirectory = this.platform.is("ios")
      ? this.file.dataDirectory
      : this.file.externalDataDirectory;
    this.file
      .writeFile(
        writeDirectory,
        filename,
        this.convertBase64ToBlob(fileContent, "data:" + mimeType),
        { replace: true }
      )
      .then(() => {
        this.opener.open(writeDirectory + filename, mimeType).catch(() => {
          this.alert.showErrorMessage(710);
        });
      })
      .catch(() => {
        this.alert.showErrorMessage(710);
      });
  }

  convertBase64ToBlob(b64Data, contentType): Blob {
    contentType = contentType || "";
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, "");
    b64Data = b64Data.replace(/\s/g, "");
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }
}
