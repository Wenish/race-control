import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller()
@ApiTags('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: SignInDto })
  async singIn(@Body() signInDto: SignInDto) {
    let token;
    try {
      token = await this.authenticationService.getToken(signInDto);
    } catch (e) {
      throw new HttpException('wrong email and/or password', 401);
    }

    return token;
  }
}
