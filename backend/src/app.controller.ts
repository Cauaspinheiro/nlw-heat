import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/signin')
  @Redirect('https://github.com/')
  getGithub() {
    const githubClientId = process.env.GITHUB_CLIENT_ID;

    return {
      url: `https://github.com/login/oauth/authorize?client_id=${githubClientId}`,
    };
  }

  @Get('/signin/callback')
  async getGithubCallback(@Query('code') code: string) {
    return { code };
  }

  @Post('/authenticate')
  async authenticate(@Body('code') code: string) {
    try {
      return await this.appService.authenticate(code);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.response.data.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/messages')
  async getMessages(@Query('count') count = 3) {
    try {
      return await this.appService.getLastMessages(Number(count));
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.response.data.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
