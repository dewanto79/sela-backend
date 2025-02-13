import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePropertiesTags1716824502336
  implements MigrationInterface
{
  name = 'CreateTablePropertiesTags1716824502336';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`properties_tags\` (\`property_id\` varchar(255) NOT NULL, \`tag_id\` varchar(255) NOT NULL, PRIMARY KEY (\`property_id\`, \`tag_id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE INDEX \`IDX_b70000a624e1f0ab245318ef70\` ON \`properties_tags\` (\`property_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_23c6bef3a45883fc85afa2477e\` ON \`properties_tags\` (\`tag_id\`)`,
    );

    await queryRunner.query(
      `ALTER TABLE \`properties_tags\` ADD CONSTRAINT \`FK_b70000a624e1f0ab245318ef709\` FOREIGN KEY (\`property_id\`) REFERENCES \`properties\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`properties_tags\` ADD CONSTRAINT \`FK_23c6bef3a45883fc85afa2477e0\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tags\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`properties_tags\` DROP FOREIGN KEY \`FK_23c6bef3a45883fc85afa2477e0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`properties_tags\` DROP FOREIGN KEY \`FK_b70000a624e1f0ab245318ef709\``,
    );

    await queryRunner.query(
      `DROP INDEX \`IDX_23c6bef3a45883fc85afa2477e\` ON \`properties_tags\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b70000a624e1f0ab245318ef70\` ON \`properties_tags\``,
    );

    await queryRunner.query(`DROP TABLE \`properties_tags\``);
  }
}
