import { Renderer, Input } from "@angular/core";
import { Component, ViewChild, OnInit } from "@angular/core";

@Component({
  selector: "accordion",
  templateUrl: "accordion.html"
})
export class AccordionComponent implements OnInit {
  accordionExpanded = false;
  @ViewChild("cardContent") accordionContent: any;

  @Input("data") header;

  icon: String = "ios-arrow-down";
  constructor(private renderer: Renderer) {}

  ngOnInit() {
    this.renderer.setElementStyle(
      this.accordionContent.nativeElement,
      "webkitTransition",
      "max-height 500ms, padding: 500ms"
    );
  }

  toggleAccordion() {
    if (this.accordionExpanded) {
      this.renderer.setElementStyle(
        this.accordionContent.nativeElement,
        "max-height",
        "0px"
      );
      this.renderer.setElementStyle(
        this.accordionContent.nativeElement,
        "padding",
        "0px 16px"
      );
    } else {
      this.renderer.setElementStyle(
        this.accordionContent.nativeElement,
        "max-height",
        "500px"
      );
      this.renderer.setElementStyle(
        this.accordionContent.nativeElement,
        "padding",
        "13px 16px"
      );
    }
    this.accordionExpanded = !this.accordionExpanded;
    this.icon =
      this.icon === "ios-arrow-down" ? "ios-arrow-up" : "ios-arrow-down";
  }
}
