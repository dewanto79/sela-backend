import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablePropertiesAddColumnSlug1747655182576
  implements MigrationInterface
{
  name = 'AlterTablePropertiesAddColumnSlug1747655182576';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`properties\` ADD \`slug\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`properties\` DROP COLUMN \`slug\``);
  }
}
