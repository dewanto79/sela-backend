import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableImage1716473691019 implements MigrationInterface {
  name = 'CreateTableImage1716473691019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "document_id" uuid NOT NULL, "type" character varying NOT NULL DEFAULT 'normal', "url" text NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "images"`);
  }
}
