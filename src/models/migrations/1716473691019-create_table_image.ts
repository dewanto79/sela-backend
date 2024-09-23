import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableImage1716473691019 implements MigrationInterface {
  name = 'CreateTableImage1716473691019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`images\` (\`id\` varchar(36) NOT NULL, \`document_id\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL DEFAULT 'normal', \`url\` text NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'active', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`images\``);
  }
}
