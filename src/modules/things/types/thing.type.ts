export class Thing {
  id: string;
  name: string;
  description: string;
  length: number;
  width: number;
  height: number;
  capacity: number;
  isUsed: boolean = false;

  constructor(fields: Partial<Thing>) {
    Object.assign(this, fields);
  }
}
