import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCurrency1724251964798 implements MigrationInterface {
  name = 'CreateTableCurrency1724251964798';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "currencies" ("id" character varying NOT NULL, "name" character varying NOT NULL, "symbol" character varying NOT NULL, "symbol_native" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "currency_rate" numeric, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_d528c54860c4182db13548e08c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "currency_id" character varying NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD CONSTRAINT "FK_8cb7e7d74ffde68e408437f4652" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "properties" DROP CONSTRAINT "FK_8cb7e7d74ffde68e408437f4652"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" DROP COLUMN "currency_id"`,
    );
    await queryRunner.query(`DROP TABLE "currencies"`);
  }
}
