import { DatabaseService } from '../../../database/interfaces/database-service.interface';
import { SignupDto } from '../../../../modules/auth/dtos/signup.dto';
import { User } from '../../../../modules/users/types/user.type';
import { v4 as uuid } from 'uuid';
import { encrypt, getHash } from '../../../helpers/crypto.helper';

export class UsersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  findOneByEmail(email: string): User {
    return this.databaseService.getUserByEmail(email);
  }

  async createOne(signupDto: SignupDto): Promise<User> {
    const user = new User({
      ...signupDto,
      id: uuid(),
      email: encrypt(signupDto.email),
      password: await getHash(signupDto.password),
    });
    return this.databaseService.createOne(user);
  }
}
