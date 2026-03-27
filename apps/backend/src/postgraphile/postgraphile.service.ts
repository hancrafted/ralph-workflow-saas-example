import { Injectable, OnModuleDestroy, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { postgraphile } from 'postgraphile';
import { PostGraphileAmberPreset } from 'postgraphile/presets/amber';
import { makePgService } from 'postgraphile/adaptors/pg';

@Injectable()
export class PostGraphileService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PostGraphileService.name);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private pglInstance: any;

  constructor(private readonly config: ConfigService) {}

  onModuleInit(): void {
    const host = this.config.get<string>('DB_HOST', 'localhost');
    const port = this.config.get<number>('DB_PORT', 5432);
    const username = this.config.get<string>('DB_USER', 'app_user');
    const password = this.config.get<string>('DB_PASSWORD', 'app_password');
    const database = this.config.get<string>('DB_NAME', 'hc_dev');

    const connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`;

    const preset: GraphileConfig.Preset = {
      extends: [PostGraphileAmberPreset],
      pgServices: [
        makePgService({
          connectionString,
          schemas: ['public'],
        }),
      ],
      grafast: {
        explain: false,
      },
    };

    this.pglInstance = postgraphile(preset);
    this.logger.log('PostGraphile instance initialised');
  }

  async onModuleDestroy(): Promise<void> {
    if (this.pglInstance) {
      await this.pglInstance.release();
      this.logger.log('PostGraphile instance released');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getInstance(): any {
    return this.pglInstance;
  }
}
