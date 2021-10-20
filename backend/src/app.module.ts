import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppMiddleware } from './app.middleware';
import { AppService } from './app.service';
import { EventsGateway } from './events.gateway';
import { ProtectedController } from './protected.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, ProtectedController],
  providers: [AppService, EventsGateway],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes(ProtectedController);
  }
}
