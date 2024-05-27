import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAddress1716472639135 implements MigrationInterface {
  name = 'CreateTableAddress1716472639135';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subdistrict" character varying NOT NULL, "regency" character varying NOT NULL, "province" character varying NOT NULL, "detail" character varying NOT NULL, "locationMaps" text NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "addresses"`);
  }
}