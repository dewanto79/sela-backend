import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePropertiesFacilities1716824478922
  implements MigrationInterface
{
  name = 'CreateTablePropertiesFacilities1716824478922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "properties_facilities" ("property_id" uuid NOT NULL, "facility_id" uuid NOT NULL, CONSTRAINT "PK_728b450080b3d0f95ccecee7a7e" PRIMARY KEY ("property_id", "facility_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "properties_facilities"`);
  }
}
