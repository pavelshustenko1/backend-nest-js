import { DatabaseService } from '../../../database/interfaces/database-service.interface';
import { ContainersRepository } from '../repositories/containers.repository';
import { IDataServices } from '../../../abstracts/data-services.abstract';
import { ThingsRepository } from '../repositories/things.repository';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { TYPES } from '../../../tokens/types';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class InternalDataServices implements IDataServices, OnModuleInit {
  containers: ContainersRepository;
  things: ThingsRepository;
  users: UsersRepository;

  constructor(
    @Inject(TYPES.services.DatabaseService)
    private readonly databaseService: DatabaseService,
  ) {}

  onModuleInit() {
    this.containers = new ContainersRepository(this.databaseService);
    this.things = new ThingsRepository(this.databaseService);
    this.users = new UsersRepository(this.databaseService);
  }
}
