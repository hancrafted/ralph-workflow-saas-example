import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostGraphileModule } from './postgraphile/postgraphile.module';
import { ProjectEntity } from './project/project.entity';
import { ProjectModule } from './project/project.module';

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
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        autoSchemaFile: true,
        // Apollo Sandbox is the default in Apollo Server 5; enable the legacy
        // GraphQL Playground only when GRAPHQL_PLAYGROUND=true is set.
        playground: config.get<string>('GRAPHQL_PLAYGROUND') === 'true',
        path: '/graphql',
      }),
    }),
    PostGraphileModule,
    ProjectModule,
  ],
})
export class AppModule {}
