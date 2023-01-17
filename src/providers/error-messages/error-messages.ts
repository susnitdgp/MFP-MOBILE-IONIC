import { Injectable } from "@angular/core";

@Injectable()
export class ErrorMessagesProvider {
  errorMessages: Object = {
    101: "Unable to send OTP. Please try again later",
    108: "Failed to fetch user details. Please try again later",
    109: "Error fetching user details. Please try again later",
    110: "User details are not available. Please contact administrator",
    "-1": "Unable to process your request. Please try again later",
    500: "Unable to process your request. Please try again later",
    401: "Invalid Credentials, Please try again",
    404: "Unable to process your request. Please try again later",
    700: "Username and Password are required",
    701: "Please enter username",
    702: "Please enter password",
    703: "Please enter OTP",
    704: "Please enter notesheet comments",
    705: "You are offline. Please connect to internet to continue",
    706: "Unable to process your request. Please try again later",
    707: "Invalid OTP, Please try again",
    708: "Notesheet not found",
    709: "Please enter at least 3 characters",
    710: "Unable to open specified file.",
    711: "Please select filters to apply",
    712: "No employee matched selected filters. Please try again",
    713: "Please select an employee",
    714: "Data is not available",
    715: "Unable to fetch document content",
    716: "Unable to load annexures",
    717: "OTP has been resent successfully",
    718: "Unable to resend OTP",
    719: "Please enter a valid OTP",
    720: "No users match the keyword",
    721: "No internet connection. Please ensure network connectivity to work with PRADIP app.",
    722: "Please enter valid username",
    723: "Please enter valid password",
    724: "username must be of 6 characters",
    725: "Unable to fetch meta data of the task",
    726: "No actions have been performed on this task",
    727: "Session expired. Please login again.",
    728: "Please select employee to add",
    729: "You cannot enter same user twice sequentially",
    730: "Dashboard is data aggregation of Predefined - Office Note, Payment, Tendering and PR Approval processes for last 90 days",
    799: "Login failed, Please try again later"
  };

  constructor() {}
}
