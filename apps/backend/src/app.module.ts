import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './project/project.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USER', 'app_user'),
        password: config.get<string>('DB_PASSWORD', 'app_password'),
        database: config.get<string>('DB_NAME', 'hc_dev'),
        entities: [ProjectEntity],
        migrations: ['dist/migrations/*.js'],
        synchronize: false,
      }),
    }),
  ],
})
export class AppModule {}
