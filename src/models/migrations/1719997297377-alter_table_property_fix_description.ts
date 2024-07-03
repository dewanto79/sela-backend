import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablePropertyFixDescription1719997297377
  implements MigrationInterface
{
  name = 'AlterTablePropertyFixDescription1719997297377';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "properties" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "description_id" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "key_feature_id" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "description_en" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "key_feature_en" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "google_drive_url" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "properties" DROP COLUMN "google_drive_url"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" DROP COLUMN "key_feature_en"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" DROP COLUMN "description_en"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" DROP COLUMN "key_feature_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" DROP COLUMN "description_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "description" text NOT NULL`,
    );
  }
}
