import 'reflect-metadata';
import { createServer } from 'node:http';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { grafserv } from 'postgraphile/grafserv/express/v4';
import { AppModule } from './app.module';
import { PostGraphileService } from './postgraphile/postgraphile.service';

async function bootstrap() {
  // Use an explicit Express instance so we can share it with grafserv.
  const expressApp = express();
  const httpServer = createServer(expressApp);

  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  await app.init();

  // Mount PostGraphile at /postgraphile.
  //
  // Architecture decision: PostGraphile 5 uses the Grafast execution engine,
  // which is incompatible with @graphql-tools/stitch (stitch expects the
  // standard graphql-js executor). Attempting to stitch the two schemas at
  // runtime would require wrapping Grafast's executor, which is fragile and
  // unsupported upstream.
  //
  // Decision: serve the two layers at separate endpoints:
  //   /graphql        — NestJS/Apollo code-first resolvers (custom business logic)
  //   /postgraphile   — PostGraphile auto-generated CRUD (allProjects, createProject, …)
  //
  // Follow-up ticket should evaluate federation (Apollo Supergraph) or
  // Grafast-aware stitching once the Graphile ecosystem provides first-party
  // support.
  const pglService = app.get(PostGraphileService);
  const serv = pglService.getInstance().createServ(grafserv);
  await serv.addTo(expressApp, httpServer);

  const port = process.env.PORT ?? 3000;
  httpServer.listen(port, () => {
    console.log(`Application running on port ${port}`);
    console.log(`  NestJS GraphQL:  http://localhost:${port}/graphql`);
    console.log(`  PostGraphile:    http://localhost:${port}/postgraphile`);
  });
}

bootstrap();

