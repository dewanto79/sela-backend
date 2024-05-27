import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePropertiesTags1716824502336
  implements MigrationInterface
{
  name = 'CreateTablePropertiesTags1716824502336';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "properties_tags" ("property_id" uuid NOT NULL, "tag_id" uuid NOT NULL, CONSTRAINT "PK_0039f58ecbac69887fc3acaae38" PRIMARY KEY ("property_id", "tag_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "properties_tags"`);
  }
}
