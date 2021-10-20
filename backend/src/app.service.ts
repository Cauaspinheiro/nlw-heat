import { Injectable } from '@nestjs/common';
import axios from 'axios';
import prismaClient from './prisma';

import { sign } from 'jsonwebtoken';
import { EventsGateway } from './events.gateway';

export interface AppServiceAuthenticateAccessTokenResponse {
  access_token: string;
}

export interface AppServiceAuthenticateUserResponse {
  avatar_url: string;
  login: string;
  name: string;
  id: number;
}

@Injectable()
export class AppService {
  constructor(private readonly io: EventsGateway) {}

  async authenticate(code: string) {
    const url = 'https://github.com/login/oauth/access_token';

    const {
      data: { access_token },
    } = await axios.post<AppServiceAuthenticateAccessTokenResponse>(
      url,
      undefined,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          accept: 'application/json',
        },
      },
    );

    const {
      data: { avatar_url, login, name, id },
    } = await axios.get<AppServiceAuthenticateUserResponse>(
      'https://api.github.com/user',
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      },
    );

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          name,
          login,
          avatar_url,
        },
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return { token, user };
  }

  async createMessage(text: string, user_id: string) {
    const message = await prismaClient.message.create({
      data: {
        text,
        user_id,
      },
      include: {
        user: true,
      },
    });

    const infoWS = {
      text: message.text,
      user_id: message.user.id,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url,
      },
    };

    this.io.server.emit('new_message', infoWS);

    return message;
  }

  async getLastMessages(count: number) {
    const messages = await prismaClient.message.findMany({
      take: count,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user: true,
      },
    });

    return messages;
  }

  async profile(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });

    return user;
  }
}
