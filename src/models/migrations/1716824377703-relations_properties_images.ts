import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationsPropertiesImages1716824577703
  implements MigrationInterface
{
  name = 'RelationsPropertiesImages1716824577703';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`images\` ADD CONSTRAINT \`FK_6499d44a071fbd3a26a05159514\` FOREIGN KEY (\`document_id\`) REFERENCES \`properties\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`properties\` ADD CONSTRAINT \`FK_1467c863029590ab33d41048577\` FOREIGN KEY (\`address_id\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`properties\` ADD CONSTRAINT \`FK_1467c863029590ab33d41048577\` FOREIGN KEY (\`address_id\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_6499d44a071fbd3a26a05159514\``,
    );
  }
}
