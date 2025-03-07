import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePropertiesFacilities1716824478922
  implements MigrationInterface
{
  name = 'CreateTablePropertiesFacilities1716824478922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`properties_facilities\` (\`property_id\` varchar(255) NOT NULL, \`facility_id\` varchar(255) NOT NULL, PRIMARY KEY (\`property_id\`, \`facility_id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `CREATE INDEX \`IDX_73d0fa0165c350399768fd4f72\` ON \`properties_facilities\` (\`property_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_9f6d9dc4e51b20ed50f66e5dbb\` ON \`properties_facilities\` (\`facility_id\`)`,
    );

    await queryRunner.query(
      `ALTER TABLE \`properties_facilities\` ADD CONSTRAINT \`FK_73d0fa0165c350399768fd4f72a\` FOREIGN KEY (\`property_id\`) REFERENCES \`properties\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`properties_facilities\` ADD CONSTRAINT \`FK_9f6d9dc4e51b20ed50f66e5dbb6\` FOREIGN KEY (\`facility_id\`) REFERENCES \`facilities\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`properties_facilities\` DROP FOREIGN KEY \`FK_9f6d9dc4e51b20ed50f66e5dbb6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`properties_facilities\` DROP FOREIGN KEY \`FK_73d0fa0165c350399768fd4f72a\``,
    );

    await queryRunner.query(
      `DROP INDEX \`IDX_9f6d9dc4e51b20ed50f66e5dbb\` ON \`properties_facilities\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_73d0fa0165c350399768fd4f72\` ON \`properties_facilities\``,
    );

    await queryRunner.query(`DROP TABLE \`properties_facilities\``);
  }
}
