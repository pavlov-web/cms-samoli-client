import {MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPgConfig } from 'configs/pg.configs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: getPgConfig
      }),
      UserModule,
      FileModule,
      PortfolioModule,
      ServiceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL
        })
    }
};