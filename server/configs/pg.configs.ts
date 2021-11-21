import { ConfigService } from "@nestjs/config";

export const getPgConfig = async (configService: ConfigService)  => {
  return {
    type: configService.get('BD_TYPE'),
    host: configService.get('BD_HOST'),
    port: +configService.get('BD_PORT'),
    username: configService.get('BD_USERNAME'),
    password: configService.get('BD_PASSWORD'),
    database: configService.get('BD_NAME'),
    entities: [__dirname.replace('/configs','') + '/**/*.entity{.ts,.js}'],
    synchronize: true
  }
}