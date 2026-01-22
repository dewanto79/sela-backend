import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCurrency1724251964798 implements MigrationInterface {
  name = 'CreateTableCurrency1724251964798';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`currencies\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`symbol\` varchar(255) NOT NULL, \`symbol_native\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'active', \`currency_rate\` decimal NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `ALTER TABLE \`properties\` ADD CONSTRAINT \`FK_8cb7e7d74ffde68e408437f4652\` FOREIGN KEY (\`currency_id\`) REFERENCES \`currencies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`properties\` DROP FOREIGN KEY \`FK_8cb7e7d74ffde68e408437f4652\``,
    );

    await queryRunner.query(`DROP TABLE \`currencies\``);
  }
}
