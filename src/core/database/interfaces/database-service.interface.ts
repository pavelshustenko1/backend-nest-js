import { User } from './../../../modules/users/types/user.type';
import { Thing } from '../../../modules/things/types/thing.type';
import { Container } from '../../../modules/containers/types/container.type';

export interface DatabaseService {
  getThings(): Thing[];
  getThing(id: string): Thing;
  deleteThing(id: string): void;
  createThing(thing: Thing): Thing;

  getContainers(): Container[];
  getContainer(id: string): Container;
  deleteContainer(id: string): void;
  createContainer(thing: Container): Container;

  getUserByEmail(email: string): User;
  createOne(user: User): User;

  putThingIntoContainer(thing: Thing, container: Container): Container;
  removeThingFromContainer(thing: Thing, container: Container): Container;
}
