import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableRoles1716774693922 implements MigrationInterface {
  name = 'CreateTableRoles1716774693922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'active', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`roles\``);
  }
}
