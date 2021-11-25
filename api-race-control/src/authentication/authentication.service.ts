import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { SignInDto } from './dto/sign-in.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthenticationService {
  constructor(private httpService: HttpService) {}

  async getToken(signInDto: SignInDto) {
    const token = this.httpService.post(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDn-JeV-RUtNPb5fVmPISefm2-IZtGM_P4',
      {
        email: signInDto.email,
        password: signInDto.password,
        returnSecureToken: true,
      },
    );
    return (await firstValueFrom(token)).data;
  }
}
