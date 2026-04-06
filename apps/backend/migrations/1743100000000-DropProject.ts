import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropProject1743100000000 implements MigrationInterface {
  name = 'DropProject1743100000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "project"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "project" (
        "id"          uuid              NOT NULL DEFAULT uuid_generate_v4(),
        "name"        character varying NOT NULL,
        "description" text,
        "created_at"  TIMESTAMP         NOT NULL DEFAULT now(),
        "updated_at"  TIMESTAMP         NOT NULL DEFAULT now(),
        CONSTRAINT "PK_project" PRIMARY KEY ("id")
      )
    `);
  }
}
