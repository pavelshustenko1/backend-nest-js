import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../interfaces/auth-service.interface';
import { SignupDto } from '../dtos/signup.dto';
import { SigninDto } from '../dtos/signin.dto';
import { TYPES } from '../../../core/tokens/types';
import { Role } from '../../../core/enum/roles.enum';
import { Roles } from '../../../core/decorators/roles.decorator';
import { Auth } from '../interfaces/auth.interface';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    @Inject(TYPES.services.AuthService)
    private authService: AuthService,
  ) {}

  @Roles(Role.PUBLIC)
  @Post('signup')
  async signup(@Body() signupRequest: SignupDto): Promise<Auth> {
    return this.authService.signup(signupRequest);
  }

  @Roles(Role.PUBLIC)
  @Post('signin')
  async signin(@Body() signinRequest: SigninDto): Promise<Auth> {
    return this.authService.signin(signinRequest);
  }
}
