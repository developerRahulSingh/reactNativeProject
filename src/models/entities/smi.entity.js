class SMIEntity {
  Service: string;
  Method: string;
  TID: string;
  SMIID: string;
  ReturnDetails: boolean;
  Duration: string;
  StartTime: string;
  EndTime: string;
  Child: Array<any>;
  SMIChild: Array<any>;
}

export { SMIEntity };
