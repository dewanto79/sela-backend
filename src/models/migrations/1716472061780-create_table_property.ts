import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProperty1716472061780 implements MigrationInterface {
  name = 'CreateTableProperty1716472061780';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`properties\` (\`id\` varchar(36) NOT NULL, \`currency_id\` varchar(255) NULL, \`title\` varchar(255) NOT NULL, \`description_id\` text NULL, \`key_feature_id\` text NULL, \`description_en\` text NULL, \`key_feature_en\` text NULL, \`price\` decimal NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'active', \`availability\` tinyint NOT NULL DEFAULT 1, \`published\` tinyint NOT NULL DEFAULT 0, \`property_type\` varchar(255) NOT NULL, \`selling_type\` varchar(255) NOT NULL DEFAULT 'SELL', \`land_size\` decimal NOT NULL, \`land_size_measurement\` varchar(255) NOT NULL, \`building_size\` decimal NOT NULL, \`building_size_measurement\` varchar(255) NOT NULL, \`bed_rooms_amount\` smallint NOT NULL DEFAULT '0', \`bath_rooms_amount\` smallint NOT NULL DEFAULT '0', \`garage_amount\` smallint NOT NULL DEFAULT '0', \`car_park_amount\` smallint NOT NULL DEFAULT '0', \`floor_amount\` smallint NOT NULL DEFAULT '0', \`building_orientation\` varchar(255) NULL, \`electricity\` int NULL DEFAULT '0', \`furnished\` tinyint NOT NULL DEFAULT 0, \`owner\` varchar(255) NULL, \`owner_phone\` varchar(255) NULL, \`property_number\` varchar(255) NULL, \`google_drive_url\` varchar(255) NULL, \`address_id\` varchar(255) NULL, \`agent_id\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, UNIQUE INDEX \`REL_1467c863029590ab33d4104857\` (\`address_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`properties\``);
  }
}
