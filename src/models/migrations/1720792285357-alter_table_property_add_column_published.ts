import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablePropertyAddColumnPublished1720792285357
  implements MigrationInterface
{
  name = 'AlterTablePropertyAddColumnPublished1720792285357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "properties" ADD "published" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "published"`);
  }
}
