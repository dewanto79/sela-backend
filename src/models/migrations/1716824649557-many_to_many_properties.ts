import { MigrationInterface, QueryRunner } from 'typeorm';

export class ManyToManyProperties1716824649557 implements MigrationInterface {
  name = 'ManyToManyProperties1716824649557';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_b70000a624e1f0ab245318ef70" ON "properties_tags" ("property_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_23c6bef3a45883fc85afa2477e" ON "properties_tags" ("tag_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_73d0fa0165c350399768fd4f72" ON "properties_facilities" ("property_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9f6d9dc4e51b20ed50f66e5dbb" ON "properties_facilities" ("facility_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_facilities" ADD CONSTRAINT "FK_73d0fa0165c350399768fd4f72a" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_facilities" ADD CONSTRAINT "FK_9f6d9dc4e51b20ed50f66e5dbb6" FOREIGN KEY ("facility_id") REFERENCES "facilities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_tags" ADD CONSTRAINT "FK_b70000a624e1f0ab245318ef709" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_tags" ADD CONSTRAINT "FK_23c6bef3a45883fc85afa2477e0" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "properties_tags" DROP CONSTRAINT "FK_23c6bef3a45883fc85afa2477e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_tags" DROP CONSTRAINT "FK_b70000a624e1f0ab245318ef709"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_facilities" DROP CONSTRAINT "FK_9f6d9dc4e51b20ed50f66e5dbb6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_facilities" DROP CONSTRAINT "FK_73d0fa0165c350399768fd4f72a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9f6d9dc4e51b20ed50f66e5dbb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_73d0fa0165c350399768fd4f72"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_23c6bef3a45883fc85afa2477e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b70000a624e1f0ab245318ef70"`,
    );
  }
}
