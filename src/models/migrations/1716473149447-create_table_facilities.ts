import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableFacilities1716473149447 implements MigrationInterface {
  name = 'CreateTableFacilities1716473149447';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`facilities\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'active', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`facilities\``);
  }
}
