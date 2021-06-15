export class PoliceApiData {
  public type: string;
  public location: string;
  public outcome: string;
  public month: string

  constructor(type: string, loc: string, outcome: string, month: string) {
    this.type = type;
    this.location = loc;
    this.outcome = outcome;
    this.month = month;
  }
}
