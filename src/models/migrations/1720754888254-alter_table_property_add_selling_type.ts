import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablePropertyAddSellingType1720754888254
  implements MigrationInterface
{
  name = 'AlterTablePropertyAddSellingType1720754888254';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "selling_type" character varying NOT NULL DEFAULT 'SELL'`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" DROP COLUMN "availability"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "availability" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "properties" DROP COLUMN "selling_type"`,
    );

    await queryRunner.query(
      `ALTER TABLE "properties" DROP COLUMN "availability"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "availability" character varying NOT NULL`,
    );
  }
}
