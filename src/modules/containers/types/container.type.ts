export class Container {
  id: string;
  name: string;
  description: string;
  length: number;
  width: number;
  height: number;
  capacity: number;
  availableCapacity: number;
  thingsInside: string[] = [];
  nestedContainer?: Container;

  constructor(fields: Partial<Container>) {
    Object.assign(this, fields);
  }
}
