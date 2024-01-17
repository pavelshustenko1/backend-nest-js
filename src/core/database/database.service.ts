import { SignupDto } from '../../modules/auth/dtos/signup.dto';
import { Container } from '../../modules/containers/types/container.type';
import { Thing } from '../../modules/things/types/thing.type';
import { User } from '../../modules/users/types/user.type';
import { encrypt } from '../helpers/crypto.helper';
import { DatabaseService } from './interfaces/database-service.interface';
import { IDatabase } from './interfaces/database.interface';
import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { THINGS } from './mocks/things.mock';
import { CONTAINERS } from './mocks/containers.mock';
import { USERS } from './mocks/user.mock';

@Injectable()
export class DatabaseServiceImpl implements DatabaseService {
  private database$$: BehaviorSubject<IDatabase> = new BehaviorSubject<
    IDatabase
  >({
    things: THINGS,
    containers: CONTAINERS,
    users: USERS,
  });

  /* THINGS */

  public getThings(): Thing[] {
    return this.database$$.getValue().things;
  }

  public getThing(id: string): Thing {
    const things = this.database$$.getValue().things;

    return things.find(x => x.id === id);
  }

  public createThing(thing: Thing): Thing {
    const currentValue = this.database$$.getValue();

    const updated: IDatabase = {
      ...currentValue,
      things: [...currentValue.things, thing],
    };

    this.database$$.next(updated);

    return thing;
  }

  public deleteThing(id: string): void {
    const currentValue = this.database$$.getValue();

    currentValue.things.forEach((item, index) => {
      if (item.id === id) {
        currentValue.things.splice(index, 1);
      }
    });

    this.database$$.next(currentValue);
  }

  /* CONTAINERS */

  public getContainers(): Container[] {
    return this.database$$.getValue().containers;
  }

  public getContainer(id: string): Container {
    const containers = this.database$$.getValue().containers;

    return containers.find(x => x.id === id);
  }

  public createContainer(container: Container): Container {
    const currentValue = this.database$$.getValue();

    const updated: IDatabase = {
      ...currentValue,
      containers: [...currentValue.containers, container],
    };

    this.database$$.next(updated);

    return container;
  }

  public deleteContainer(id: string): void {
    const currentValue = this.database$$.getValue();

    currentValue.containers.forEach((item, index) => {
      if (item.id === id) {
        currentValue.containers.splice(index, 1);
      }
    });

    this.database$$.next(currentValue);
  }

  /* USERS */
  public getUserByEmail(email: string): User {
    const users = this.database$$.getValue().users;

    return users.find(x => x.email === encrypt(email));
  }

  createOne(user: User): User {
    const currentValue = this.database$$.getValue();

    const updated: IDatabase = {
      ...currentValue,
      users: [...currentValue.users, user],
    };

    this.database$$.next(updated);

    return user;
  }

  /* ACTIONS */
  putThingIntoContainer(thing: Thing, container: Container): Container {
    const currentValue = this.database$$.getValue();

    const thingToUdate = currentValue.things.find(x => x.id === thing.id);
    thingToUdate.isUsed = true;

    const containerToUdate = currentValue.containers.find(
      x => x.id === container.id,
    );
    containerToUdate.thingsInside.push(thing.id);
    containerToUdate.availableCapacity -= thing.capacity;

    const updated: IDatabase = {
      ...currentValue,
    };

    this.database$$.next(updated);

    return containerToUdate;
  }

  removeThingFromContainer(thing: Thing, container: Container): Container {
    const currentValue = this.database$$.getValue();

    const thingToUdate = currentValue.things.find(x => x.id === thing.id);
    thingToUdate.isUsed = false;

    const containerToUdate = currentValue.containers.find(
      x => x.id === container.id,
    );

    const thingIndex = containerToUdate.thingsInside.indexOf(thing.id);
    containerToUdate.thingsInside.splice(thingIndex, 1);

    containerToUdate.availableCapacity += thing.capacity;

    const updated: IDatabase = {
      ...currentValue,
    };

    this.database$$.next(updated);

    return containerToUdate;
  }
}
