import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { compareHash } from '../../../core/helpers/crypto.helper';
import { AuthService } from '../interfaces/auth-service.interface';
import { Auth } from '../interfaces/auth.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interfaces';
import { getUnixTime } from 'date-fns';
import { SignupDto } from '../dtos/signup.dto';
import { SigninDto } from '../dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../../core/enum/roles.enum';
import { IDataServices } from '../../../core/abstracts/data-services.abstract';
import { User } from '../../users/types/user.type';

@Injectable()
export class AuthServiceImpl implements AuthService {
  private logger = new Logger('AUTH');
  readonly accessTokenLifeSpanInSec = 60 * 60 * 24; // 1 day

  constructor(
    private IDataService: IDataServices,
    private jwtService: JwtService,
  ) {}

  public async signup(signupRequest: SignupDto): Promise<Auth> {
    if (!signupRequest.email) {
      throw new HttpException('Email required', HttpStatus.BAD_REQUEST);
    }

    const userFound: User = this.IDataService.users.findOneByEmail(
      signupRequest.email,
    );

    if (userFound) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const user = await this.IDataService.users.createOne(signupRequest);
      const jwtPayload = this.userToJwt(user);
      const accessToken = await this.generateAccessToken(jwtPayload);
      const expirationTime =
        getUnixTime(new Date()) + this.accessTokenLifeSpanInSec;

      return {
        accessToken,
        expirationTime,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw e;
    }
  }

  public async signin(signinRequest: SigninDto): Promise<Auth> {
    const user: User = this.IDataService.users.findOneByEmail(
      signinRequest.email,
    );

    if (!user) {
      throw new NotFoundException();
    }

    const isValid: boolean = await this.userIsValid(
      user,
      signinRequest.password,
    );

    if (!isValid) {
      throw new HttpException(
        'Wrong email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const jwtPayload = this.userToJwt(user);
    const accessToken = await this.generateAccessToken(jwtPayload);
    const expirationTime =
      getUnixTime(new Date()) + this.accessTokenLifeSpanInSec;

    return {
      accessToken,
      expirationTime,
    };
  }

  /* PRIVATE METHODS */

  private async userIsValid(user: User, password: string): Promise<boolean> {
    return user && (await compareHash(password, user.password));
  }

  private userToJwt(user: User): JwtPayload {
    return {
      id: user.id,
      roles: [Role.USER],
    };
  }

  private async generateAccessToken(jwtPayload: JwtPayload): Promise<string> {
    try {
      return this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
