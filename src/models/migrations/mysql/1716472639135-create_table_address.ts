import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAddress1716472639135 implements MigrationInterface {
  name = 'CreateTableAddress1716472639135';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`addresses\` (\`id\` varchar(36) NOT NULL, \`subdistrict\` varchar(255) NOT NULL, \`regency\` varchar(255) NOT NULL, \`province\` varchar(255) NOT NULL, \`detail\` varchar(255) NULL, \`locationMaps\` text NULL, \`status\` varchar(255) NOT NULL DEFAULT 'active', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`addresses\``);
  }
}
