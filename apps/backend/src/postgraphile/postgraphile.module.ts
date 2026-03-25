import { Module } from '@nestjs/common';
import { PostGraphileService } from './postgraphile.service';

@Module({
  providers: [PostGraphileService],
  exports: [PostGraphileService],
})
export class PostGraphileModule {}
