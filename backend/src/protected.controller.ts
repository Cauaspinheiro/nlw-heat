import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request as RequestDecorator,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class ProtectedController {
  constructor(private readonly appService: AppService) {}

  @Post('/messages')
  async sendMessage(
    @Body('message') message: string,
    @RequestDecorator() req: Request,
  ) {
    const { user_id } = req;

    try {
      return await this.appService.createMessage(message, user_id);
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

  @Get('/me')
  async getMe(@RequestDecorator() req: Request) {
    return await this.appService.profile(req.user_id);
  }
}
