import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { TweetModule } from './tweet/tweet.module';
import {UsersModule} from "./user/users.module";
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import * as process from "node:process";
import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";
import evnValidator from "./config/env.validation"

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
      UsersModule,
      TweetModule,
      AuthModule,
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath : !ENV ? '.env' : `.env.${ENV.trim()}`,
        load : [appConfig,databaseConfig],
        validationSchema : evnValidator
      }),
    TypeOrmModule.forRootAsync({
    imports : [ConfigModule],
    inject : [ConfigService],
   useFactory : (configService:ConfigService) =>({
     type : "postgres",
     autoLoadEntities : configService.get('database.autoLoadEntities'),
     synchronize : configService.get('database.synchronize'),
     host: configService.get('database.host'),
     port: configService.get('database.port'),
     username: configService.get('database.username'),
     password: configService.get('database.password'),
     database: configService.get('database.name')
   })
  }), ProfileModule, HashtagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
