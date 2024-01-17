import { SigninDto } from '../dtos/signin.dto';
import { SignupDto } from '../dtos/signup.dto';
import { Auth } from './auth.interface';

export interface AuthService {
  signup(dto: SignupDto): Promise<Auth>;
  signin(dto: SigninDto): Promise<Auth>;
}
