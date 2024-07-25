import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablePropertiesAddNumber1721916221549
  implements MigrationInterface
{
  name = 'AlterTablePropertiesAddNumber1721916221549';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "owner" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "owner_phone" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "property_number" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "properties" DROP COLUMN "property_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" DROP COLUMN "owner_phone"`,
    );
    await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "owner"`);
  }
}
