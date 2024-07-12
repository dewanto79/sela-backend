import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProperty1716472061780 implements MigrationInterface {
  name = 'CreateTableProperty1716472061780';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description_id" text, "key_feature_id" text, "description_en" text, "key_feature_en" text, "price" numeric NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "availability" boolean NOT NULL DEFAULT true, "property_type" character varying NOT NULL, "selling_type" character varying NOT NULL DEFAULT 'SELL', "land_size" numeric NOT NULL, "land_size_measurement" character varying NOT NULL, "building_size" numeric NOT NULL, "building_size_measurement" character varying NOT NULL, "bed_rooms_amount" smallint NOT NULL DEFAULT '0', "bath_rooms_amount" smallint NOT NULL DEFAULT '0', "garage_amount" smallint NOT NULL DEFAULT '0', "car_park_amount" smallint NOT NULL DEFAULT '0', "floor_amount" smallint NOT NULL DEFAULT '0', "building_orientation" character varying, "electricity" integer DEFAULT '0', "furnished" boolean NOT NULL DEFAULT false, "google_drive_url" character varying, "address_id" uuid, "agent_id" uuid, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "REL_1467c863029590ab33d4104857" UNIQUE ("address_id"), CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "properties"`);
  }
}
