import { Component, ViewChild, NgZone } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Chart } from "chart.js";
import { AdapterCallsProvider } from "../../providers/adapter-calls/adapter-calls";
import { LoggerProvider } from "../../providers/logger/logger";
import { LoaderProvider } from "../../providers/loader/loader";
import "chart.piecelabel.js";
import { AlertProvider } from "../../providers/alert/alert";

@IonicPage()
@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html"
})
export class DashboardPage {
  @ViewChild("tasksChart") tasksChart;
  @ViewChild("filesChart") filesChart;
  @ViewChild("deptChart") deptChart;
  @ViewChild("ccChart") ccChart;
  @ViewChild("plantChart") plantChart;

  selectedSegment = "tasks";

  totalTaskCount = 0;
  taskChartLoadingEl: any;
  taskPieChartEl: any;
  taskSummary: any = [];
  taskChartLabels: any = [];
  taskChartValues: any = [];
  taskChartColours: any = ["#548235", "#ED7D31", "#FFC000", "#FF0000"];

  totalFileCount = 0;
  fileChartLoadingEl: any;
  filePieChartEl: any;
  fileSummary: any = [];
  fileChartLabels: any = [];
  fileChartValues: any = [];
  fileChartColours: any = ["#548235", "#A6A6A6", "#D7E6Cf", "#FFD966"];

  totalDeptFilesCount = 0;
  deptChartLoadingEl: any;
  deptPieChartEl: any;
  deptSummary: any = [];
  deptChartLabels: any = [];
  deptChartValues: any = [];
  deptEmployees: any = [];

  totalCCFilesCount = 0;
  ccChartLoadingEl: any;
  ccPieChartEl: any;
  ccSummary: any = [];
  ccChartLabels: any = [];
  ccChartValues: any = [];
  ccPlants: any = [];

  totalPlantFilesCount = 0;
  plantChartLoadingEl: any;
  plantPieChartEl: any;
  plantSummary: any = [];
  plantChartLabels: any = [];
  plantChartValues: any = [];
  plantDepts: any = [];

  dashboardParams: any;
  dashboardVisibility: any = {};

  MY_TASKS_DETAILS_ENDPOINT =
    "/adapters/BPM/resource/getMyDashboardTaskDetails";
  MY_FILES_DETAILS_ENDPOINT =
    "/adapters/BPM/resource/getMyDashboardFileDetails";
  DEPT_DASHBOARD_DETAILS_ENDPOINT = "/adapters/BPM/resource/getDeptFileDetails";
  PLANT_DASHBOARD_DETAILS_ENDPOINT =
    "/adapters/BPM/resource/getPlantFileDetails";
  CC_DASHBOARD_DETAILS_ENDPOINT = "/adapters/BPM/resource/getCCFileDetails";

  departmentalEmployees: any = [];
  departments: any = [];
  plants: any = [];
  processes: any = [
    "Office Note - Predefined",
    "Tendering Process",
    "PR Approval Process",
    "Payment Process- Service Entry Sheet",
    "Payment Process- Goods Receipt",
    "Payment Process- Inbound Delivery",
    "Payment Process- Advance Payment",
    "Payment Process - Other PO Payments",
    "Payment Process- Pay Order",
    "Payment Process- Bill Processing"
  ];

  selectedEmployee;
  selectedDepartment;
  selectedPlant;
  selectedProcess;

  deptUserFileSummary: any = [];
  plantDeptFileSummary: any = [];
  ccPlantFileSummary: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private adapter: AdapterCallsProvider,
    private logger: LoggerProvider,
    private loader: LoaderProvider,
    private alert: AlertProvider,
    private zone: NgZone
  ) {
    let today = new Date();
    let fromDate = new Date();
    fromDate.setDate(today.getDate() - 90);
    this.dashboardParams = {
      fromDate: fromDate,
      toDate: today,
      channel: "Mobile"
    };
    this.dashboardVisibility = navParams.data;
    if (!this.dashboardVisibility) {
      this.getDashboardVisibilities();
    }
  }

  getDashboardVisibilities() {
    this.adapter
      .processGetRequest("/adapters/BPM/resource/getDashboardVisibilities", [])
      .then(response => {
        this.dashboardVisibility = response.data.data.dashboardVisibility;
      })
      .catch(error => {
        this.logger.debug(error);
      });
  }

  ionViewDidLoad() {
    this.getTaskSummary();
  }

  getTaskSummary() {
    this.loader.showLoading();

    const payload = [
      {
        queryParamName: "params",
        queryParamValue: encodeURIComponent(
          JSON.stringify(this.dashboardParams)
        )
      }
    ];
    this.adapter
      .processGetRequest("/adapters/BPM/resource/getTaskSummary", payload)
      .then(
        response => {
          this.loader.dismissLoading();
          this.taskSummary = response.data.data.results.items;
          this.prepareTaskSummaryChart();
        },
        error => {
          this.loader.dismissLoading();
        }
      );
  }

  getFileSummary() {
    this.loader.showLoading();

    const payload = [
      {
        queryParamName: "params",
        queryParamValue: encodeURIComponent(
          JSON.stringify(this.dashboardParams)
        )
      }
    ];
    this.adapter
      .processGetRequest("/adapters/BPM/resource/getFileSummary", payload)
      .then(
        response => {
          this.loader.dismissLoading();
          this.fileSummary = response.data.data.results.items;
          this.prepareFileSummaryChart();
        },
        error => {
          this.loader.dismissLoading();
        }
      );
  }

  prepareFileSummaryChart() {
    this.fileSummary.forEach(element => {
      this.fileChartLabels.push(element.status);
      this.fileChartValues.push(element.count);
      this.totalFileCount = this.totalFileCount + +element.count;
    });

    if (this.totalFileCount) {
      this.createPieChart(
        this.filePieChartEl,
        this.filesChart,
        this.fileChartLabels,
        this.fileChartValues,
        this.fileChartColours,
        this.fileChartLoadingEl,
        "file"
      );
    } else {
      this.alert.showErrorMessage(714);
    }
  }

  prepareTaskSummaryChart() {
    this.taskSummary.forEach(element => {
      this.taskChartLabels.push(element.name);
      this.taskChartValues.push(element.count);
      this.totalTaskCount = this.totalTaskCount + +element.count;
    });

    if (this.totalTaskCount) {
      this.createPieChart(
        this.taskPieChartEl,
        this.tasksChart,
        this.taskChartLabels,
        this.taskChartValues,
        this.taskChartColours,
        this.taskChartLoadingEl,
        "task"
      );
    } else {
      this.alert.showErrorMessage(714);
    }
  }

  createPieChart(
    pieChartEl,
    chart,
    chartLabels,
    chartValues,
    chartColors,
    chartLoadingEl,
    dashboardType
  ) {
    pieChartEl = new Chart(chart.nativeElement, {
      type: "pie",
      data: {
        labels: chartLabels,
        datasets: [
          {
            data: chartValues,
            duration: 2000,
            easing: "easeInQuart",
            backgroundColor: chartColors
          }
        ]
      },
      options: {
        tooltips: {
          enabled: false
        },
        pieceLabel: {
          mode: "value",
          fontColor: "#fff"
        },
        legend: {
          display: true,
          fullWidth: true,
          position: "bottom",
          labels: {
            fontColor: "#000"
          }
        }
      }
    });

    if (dashboardType == "task") {
      this.taskPieChartEl = pieChartEl;
    } else if (dashboardType == "file") {
      this.filePieChartEl = pieChartEl;
    } else if (dashboardType == "dept") {
      this.deptPieChartEl = pieChartEl;
    } else if (dashboardType == "cc") {
      this.ccPieChartEl = pieChartEl;
    } else if (dashboardType == "plant") {
      this.plantPieChartEl = pieChartEl;
    }

    chartLoadingEl = pieChartEl.generateLegend();
  }

  tasksChartClick(evnt) {
    const label = this.getLabelOfThePie(evnt, this.taskPieChartEl);
    if (label) {
      this.getDashboardDetails(
        this.MY_TASKS_DETAILS_ENDPOINT,
        "task",
        label,
        {},
        label + " Tasks"
      );
    }
  }

  filesChartClick(evnt) {
    const label = this.getLabelOfThePie(evnt, this.filePieChartEl);
    if (label) {
      this.getDashboardDetails(
        this.MY_FILES_DETAILS_ENDPOINT,
        "file",
        label,
        {},
        label + " Files"
      );
    }
  }

  getLabelOfThePie(evnt, chartEl) {
    let label = "";
    const firstPoint = chartEl.getElementAtEvent(evnt)[0];
    if (firstPoint) {
      label = chartEl.data.labels[firstPoint._index];
    }
    this.logger.debug(label);
    return label;
  }

  onSegmentChange() {
    this.zone.run(() => {
      if (this.selectedSegment == "files" && this.fileSummary.length == 0) {
        this.getFileSummary();
      } else if (
        this.selectedSegment == "dept" &&
        this.deptSummary.length == 0
      ) {
        this.getDepartmentSummary();
      } else if (
        this.selectedSegment == "plant" &&
        this.plantSummary.length == 0
      ) {
        this.getPlantSummary();
      } else if (this.selectedSegment == "cc" && this.ccSummary.length == 0) {
        this.getCCSummary();
      }
    });
  }

  goToSummaryPage(navData) {
    this.navCtrl.push("DashboardSummaryPage", navData);
  }

  getDepartmentSummary() {
    this.loader.showLoading();

    const payload = [
      {
        queryParamName: "params",
        queryParamValue: encodeURIComponent(
          JSON.stringify(this.dashboardParams)
        )
      }
    ];
    this.adapter
      .processGetRequest(
        "/adapters/BPM/resource/getDepartmentFileSummary",
        payload
      )
      .then(
        response => {
          this.loader.dismissLoading();
          let deptFileSummary = JSON.parse(response.deptFileSummary);
          let employees = JSON.parse(response.deptUsers);
          this.departmentalEmployees = employees.data.data.users.items;
          this.deptSummary = deptFileSummary.data.data.results.items;
          this.prepareDeptSummaryChart();
        },
        error => {
          this.loader.dismissLoading();
        }
      );
  }

  prepareDeptSummaryChart() {
    this.deptSummary.forEach(element => {
      this.deptChartLabels.push(element.status);
      this.deptChartValues.push(element.count);
      this.totalDeptFilesCount = this.totalTaskCount + +element.count;
    });

    if (this.totalDeptFilesCount) {
      this.createPieChart(
        this.deptPieChartEl,
        this.deptChart,
        this.deptChartLabels,
        this.deptChartValues,
        this.fileChartColours,
        this.deptChartLoadingEl,
        "dept"
      );
    } else {
      this.alert.showErrorMessage(714);
    }
  }

  getDashboardDetails(
    endpoint,
    dashboardType,
    fileStatus,
    drillDownParams,
    detailsPageTitle
  ) {
    this.loader.showLoading();
    const params = {
      pageOffset: 0,
      pageSize: 20,
      fileStatus: fileStatus,
      ...this.dashboardParams,
      ...drillDownParams
    };
    this.logger.debug(params);
    const payload = [
      {
        queryParamName: "params",
        queryParamValue: encodeURIComponent(JSON.stringify(params))
      }
    ];
    this.adapter.processGetRequest(endpoint, payload).then(
      response => {
        this.loader.dismissLoading();
        const responseData = response.data.data;
        if (responseData.errorMessage) {
        } else {
          const navData = {
            data: responseData.results.items,
            dashboardType: dashboardType,
            endpoint: endpoint,
            params: params,
            pageTitle: detailsPageTitle
          };
          this.goToSummaryPage(navData);
        }
      },
      error => {
        this.loader.dismissLoading();
      }
    );
  }

  getCCSummary() {
    this.loader.showLoading();

    const payload = [
      {
        queryParamName: "params",
        queryParamValue: encodeURIComponent(
          JSON.stringify(this.dashboardParams)
        )
      }
    ];
    this.adapter
      .processGetRequest("/adapters/BPM/resource/getCCFileSummary", payload)
      .then(
        response => {
          this.loader.dismissLoading();
          let ccFileSummary = JSON.parse(response.ccFileSummary);
          let plantsObj = JSON.parse(response.plants);
          this.plants = plantsObj.data.data.plants.items;
          this.ccSummary = ccFileSummary.data.data.results.items;
          this.prepareCCSummaryChart();
        },
        error => {
          this.loader.dismissLoading();
        }
      );
  }

  prepareCCSummaryChart() {
    this.ccSummary.forEach(element => {
      this.ccChartLabels.push(element.status);
      this.ccChartValues.push(element.count);
      this.totalCCFilesCount = this.totalTaskCount + +element.count;
    });

    if (this.totalCCFilesCount) {
      this.createPieChart(
        this.ccPieChartEl,
        this.ccChart,
        this.ccChartLabels,
        this.ccChartValues,
        this.fileChartColours,
        this.ccChartLoadingEl,
        "cc"
      );
    } else {
      this.alert.showErrorMessage(714);
    }
  }

  ccChartClick(evnt) {
    const label = this.getLabelOfThePie(evnt, this.ccPieChartEl);
    if (label) {
      this.getDashboardDetails(
        this.CC_DASHBOARD_DETAILS_ENDPOINT,
        "cc",
        label,
        {},
        "Plant Level " + label + " Files"
      );
    }
  }

  deptChartClick(evnt) {
    const label = this.getLabelOfThePie(evnt, this.deptPieChartEl);
    if (label) {
      this.getDashboardDetails(
        this.DEPT_DASHBOARD_DETAILS_ENDPOINT,
        "dept",
        label,
        {},
        "Departmental " + label + " Files"
      );
    }
  }

  getPlantSummary() {
    this.loader.showLoading();

    const payload = [
      {
        queryParamName: "params",
        queryParamValue: encodeURIComponent(
          JSON.stringify(this.dashboardParams)
        )
      }
    ];
    this.adapter
      .processGetRequest("/adapters/BPM/resource/getPlantFileSummary", payload)
      .then(
        response => {
          this.loader.dismissLoading();
          let plantFileSummary = JSON.parse(response.plantFileSummary);

          let deptsResponse = JSON.parse(response.depts);
          this.departments = deptsResponse.data.data.departments.items;
          this.plantSummary = plantFileSummary.data.data.results.items;
          this.preparePlantSummaryChart();
        },
        error => {
          this.loader.dismissLoading();
        }
      );
  }

  preparePlantSummaryChart() {
    this.plantSummary.forEach(element => {
      this.plantChartLabels.push(element.status);
      this.plantChartValues.push(element.count);
      this.totalPlantFilesCount = this.totalPlantFilesCount + +element.count;
    });

    if (this.totalPlantFilesCount) {
      this.createPieChart(
        this.plantPieChartEl,
        this.plantChart,
        this.plantChartLabels,
        this.plantChartValues,
        this.fileChartColours,
        this.plantChartLoadingEl,
        "plant"
      );
    } else {
      this.alert.showErrorMessage(714);
    }
  }

  plantChartClick(evnt) {
    const label = this.getLabelOfThePie(evnt, this.plantPieChartEl);
    if (label) {
      this.getDashboardDetails(
        this.PLANT_DASHBOARD_DETAILS_ENDPOINT,
        "plant",
        label,
        {},
        "Plant " + label + " Files"
      );
    }
  }

  onEmployeeSelection() {
    if (this.selectedEmployee) {
      this.deptDrillDown(this.selectedEmployee.value);
    }
  }

  onDeptSelection() {
    if (this.selectedDepartment) {
      this.plantDrillDown(this.selectedDepartment);
    }
  }

  onPlantSelect() {
    if (this.selectedPlant) {
      this.selectedProcess = "";
      this.ccPlantFileSummary = [];
    }
  }

  onProcessSelection() {
    if (this.selectedPlant && this.selectedProcess) {
      this.ccDrillDown(this.selectedPlant, this.selectedProcess);
    }
  }

  deptDrillDown(empId) {
    this.loader.showLoading();

    const params = { user: empId, ...this.dashboardParams };

    const payload = [
      {
        queryParamName: "params",
        queryParamValue: encodeURIComponent(JSON.stringify(params))
      }
    ];
    this.adapter
      .processGetRequest("/adapters/BPM/resource/getDeptDrillDown", payload)
      .then(
        response => {
          this.loader.dismissLoading();
          this.deptUserFileSummary = response.data.data.results.items;
        },
        error => {
          this.loader.dismissLoading();
        }
      );
  }

  plantDrillDown(department) {
    this.loader.showLoading();

    const params = { department: department, ...this.dashboardParams };

    const payload = [
      {
        queryParamName: "params",
        queryParamValue: encodeURIComponent(JSON.stringify(params))
      }
    ];
    this.adapter
      .processGetRequest("/adapters/BPM/resource/getPlantDrillDown", payload)
      .then(
        response => {
          this.loader.dismissLoading();
          this.plantDeptFileSummary = response.data.data.results.items;
        },
        error => {
          this.loader.dismissLoading();
        }
      );
  }

  ccDrillDown(selectedPlant, selectedProcess) {
    this.loader.showLoading();

    const params = {
      plant: selectedPlant,
      process: selectedProcess,
      ...this.dashboardParams
    };

    const payload = [
      {
        queryParamName: "params",
        queryParamValue: encodeURIComponent(JSON.stringify(params))
      }
    ];
    this.adapter
      .processGetRequest("/adapters/BPM/resource/getCCDrillDown", payload)
      .then(
        response => {
          this.loader.dismissLoading();
          this.ccPlantFileSummary = response.data.data.results.items;
        },
        error => {
          this.loader.dismissLoading();
        }
      );
  }

  getDeptDrillDownDetails(item) {
    if (item.count) {
      let params = { user: this.selectedEmployee.value };
      this.getDashboardDetails(
        this.DEPT_DASHBOARD_DETAILS_ENDPOINT,
        "dept",
        item.status,
        params,
        this.selectedEmployee.value + " | " + item.status + " Files"
      );
    }
  }

  getPlantDrillDownDetails(item) {
    if (item.count) {
      let params = { department: this.selectedDepartment };
      this.getDashboardDetails(
        this.PLANT_DASHBOARD_DETAILS_ENDPOINT,
        "plant",
        item.status,
        params,
        this.selectedDepartment + " | " + item.status + " Files"
      );
    }
  }

  getCCDrillDownDetails(item) {
    if (item.count) {
      let params = { plant: this.selectedPlant, process: this.selectedProcess };
      this.getDashboardDetails(
        this.CC_DASHBOARD_DETAILS_ENDPOINT,
        "cc",
        item.status,
        params,
        this.selectedPlant + " | " + item.status + " Files"
      );
    }
  }

  applyDateFilterOnMyTasks() {}

  showDashboardInfo() {
    this.alert.showErrorMessage(730);
  }
}
