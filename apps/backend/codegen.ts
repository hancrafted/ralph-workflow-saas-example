import type { CodegenConfig } from '@graphql-codegen/cli';

const port = process.env.PORT ?? 3000;

const config: CodegenConfig = {
  overwrite: true,
  schema: `http://localhost:${port}/graphql`,
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
    'src/generated/schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
