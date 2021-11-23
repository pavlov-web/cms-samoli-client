import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getPgConfig } from 'configs/pg.configs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: getPgConfig
      }),
      UserModule,
      AuthModule,
      FileModule,
      PortfolioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {};