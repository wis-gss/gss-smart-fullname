export class PersonModel {
  public name: string;
  public prefix: string;
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public suffix: string;

  constructor(data: any = {}) {
    this.name = data.name || '';
    this.prefix = data.prefix || '';
    this.firstName = data.firstName || '';
    this.middleName = data.middleName || '';
    this.lastName = data.lastName || '';
    this.suffix = data.suffix || '';
  }
}
