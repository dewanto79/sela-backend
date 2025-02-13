import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePropertiesApprovals1720796251387
  implements MigrationInterface
{
  name = 'CreateTablePropertiesApprovals1720796251387';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`properties_approvals\` (\`id\` varchar(36) NOT NULL, \`property_id\` varchar(255) NOT NULL, \`agent_id\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`note\` text NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `ALTER TABLE \`properties_approvals\` ADD CONSTRAINT \`FK_92beba916496b7eea5f268a4ddd\` FOREIGN KEY (\`property_id\`) REFERENCES \`properties\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`properties_approvals\` ADD CONSTRAINT \`FK_d0b26b777ed7a7032cc618f679e\` FOREIGN KEY (\`agent_id\`) REFERENCES \`admins\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`properties_approvals\` DROP FOREIGN KEY \`FK_d0b26b777ed7a7032cc618f679e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`properties_approvals\` DROP FOREIGN KEY \`FK_92beba916496b7eea5f268a4ddd\``,
    );

    await queryRunner.query(`DROP TABLE \`properties_approvals\``);
  }
}
