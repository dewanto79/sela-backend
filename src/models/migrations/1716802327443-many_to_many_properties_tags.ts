import { MigrationInterface, QueryRunner } from 'typeorm';

export class ManyToManyPropertiesTags1716802327443
  implements MigrationInterface
{
  name = 'ManyToManyPropertiesTags1716802327443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "properties_tags" ("property_id" uuid NOT NULL, "tag_id" uuid NOT NULL, CONSTRAINT "PK_0039f58ecbac69887fc3acaae38" PRIMARY KEY ("property_id", "tag_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b70000a624e1f0ab245318ef70" ON "properties_tags" ("property_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_23c6bef3a45883fc85afa2477e" ON "properties_tags" ("tag_id") `,
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
      `DROP INDEX "public"."IDX_23c6bef3a45883fc85afa2477e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b70000a624e1f0ab245318ef70"`,
    );
    await queryRunner.query(`DROP TABLE "properties_tags"`);
  }
}
