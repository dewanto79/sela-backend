import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAllTables1769086771920 implements MigrationInterface {
  name = 'CreateAllTables1769086771920';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "document_id" uuid NOT NULL, "type" character varying NOT NULL DEFAULT 'normal', "url" text NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "facilities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_2e6c685b2e1195e6d6394a22bc7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subdistrict" character varying NOT NULL, "regency" character varying NOT NULL, "province" character varying NOT NULL, "detail" character varying, "locationMaps" text, "status" character varying NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'active', CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "agents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_5fdef501c63984b1b98abb1e68c" UNIQUE ("email"), CONSTRAINT "PK_9c653f28ae19c5884d5baf6a1d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admins" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roles" character varying NOT NULL DEFAULT 'ADMIN', "status" character varying NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_051db7d37d478a69a7432df1479" UNIQUE ("email"), CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "properties_approvals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "property_id" uuid NOT NULL, "agent_id" uuid NOT NULL, "status" character varying NOT NULL, "note" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_42c589fbe6d140c7c44a71ccbf3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "currencies" ("id" character varying NOT NULL, "name" character varying NOT NULL, "symbol" character varying NOT NULL, "symbol_native" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "currency_rate" numeric, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d528c54860c4182db13548e08c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "currency_id" character varying, "title" character varying NOT NULL, "slug" character varying, "description_id" text, "key_feature_id" text, "description_en" text, "key_feature_en" text, "price" numeric NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "availability" boolean NOT NULL DEFAULT true, "published" boolean NOT NULL DEFAULT false, "property_type" character varying NOT NULL, "selling_type" character varying NOT NULL DEFAULT 'SELL', "land_size" numeric NOT NULL, "land_size_measurement" character varying NOT NULL, "building_size" numeric NOT NULL, "building_size_measurement" character varying NOT NULL, "bed_rooms_amount" smallint NOT NULL DEFAULT '0', "bath_rooms_amount" smallint NOT NULL DEFAULT '0', "garage_amount" smallint NOT NULL DEFAULT '0', "car_park_amount" smallint NOT NULL DEFAULT '0', "floor_amount" smallint NOT NULL DEFAULT '0', "building_orientation" character varying, "electricity" integer DEFAULT '0', "furnished" boolean NOT NULL DEFAULT false, "owner" character varying, "owner_phone" character varying, "property_number" character varying, "google_drive_url" character varying, "address_id" uuid, "agent_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_089e10e6f1282e7b4bd0c58263e" UNIQUE ("slug"), CONSTRAINT "REL_1467c863029590ab33d4104857" UNIQUE ("address_id"), CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "properties_facilities" ("property_id" uuid NOT NULL, "facility_id" uuid NOT NULL, CONSTRAINT "PK_728b450080b3d0f95ccecee7a7e" PRIMARY KEY ("property_id", "facility_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "properties_tags" ("property_id" uuid NOT NULL, "tag_id" uuid NOT NULL, CONSTRAINT "PK_0039f58ecbac69887fc3acaae38" PRIMARY KEY ("property_id", "tag_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "agents_roles" ("agent_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_19dc7ac69a6705be0a618d29904" PRIMARY KEY ("agent_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ce10224f05c3648a774f83cd54" ON "agents_roles" ("agent_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ac7404b40c43f0278dab9cad60" ON "agents_roles" ("role_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b70000a624e1f0ab245318ef70" ON "properties_tags" ("property_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_23c6bef3a45883fc85afa2477e" ON "properties_tags" ("tag_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_73d0fa0165c350399768fd4f72" ON "properties_facilities" ("property_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9f6d9dc4e51b20ed50f66e5dbb" ON "properties_facilities" ("facility_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "images" ADD CONSTRAINT "FK_6499d44a071fbd3a26a05159514" FOREIGN KEY ("document_id") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_approvals" ADD CONSTRAINT "FK_92beba916496b7eea5f268a4ddd" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_approvals" ADD CONSTRAINT "FK_d0b26b777ed7a7032cc618f679e" FOREIGN KEY ("agent_id") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD CONSTRAINT "FK_1467c863029590ab33d41048577" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD CONSTRAINT "FK_8cb7e7d74ffde68e408437f4652" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_facilities" ADD CONSTRAINT "FK_73d0fa0165c350399768fd4f72a" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_facilities" ADD CONSTRAINT "FK_9f6d9dc4e51b20ed50f66e5dbb6" FOREIGN KEY ("facility_id") REFERENCES "facilities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_tags" ADD CONSTRAINT "FK_b70000a624e1f0ab245318ef709" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_tags" ADD CONSTRAINT "FK_23c6bef3a45883fc85afa2477e0" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "agents_roles" ADD CONSTRAINT "FK_ce10224f05c3648a774f83cd547" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "agents_roles" ADD CONSTRAINT "FK_ac7404b40c43f0278dab9cad606" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "agents_roles" DROP CONSTRAINT "FK_ac7404b40c43f0278dab9cad606"`,
    );
    await queryRunner.query(
      `ALTER TABLE "agents_roles" DROP CONSTRAINT "FK_ce10224f05c3648a774f83cd547"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_tags" DROP CONSTRAINT "FK_23c6bef3a45883fc85afa2477e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_tags" DROP CONSTRAINT "FK_b70000a624e1f0ab245318ef709"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_facilities" DROP CONSTRAINT "FK_9f6d9dc4e51b20ed50f66e5dbb6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_facilities" DROP CONSTRAINT "FK_73d0fa0165c350399768fd4f72a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" DROP CONSTRAINT "FK_8cb7e7d74ffde68e408437f4652"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" DROP CONSTRAINT "FK_1467c863029590ab33d41048577"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_approvals" DROP CONSTRAINT "FK_d0b26b777ed7a7032cc618f679e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_approvals" DROP CONSTRAINT "FK_92beba916496b7eea5f268a4ddd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" DROP CONSTRAINT "FK_6499d44a071fbd3a26a05159514"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9f6d9dc4e51b20ed50f66e5dbb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_73d0fa0165c350399768fd4f72"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_23c6bef3a45883fc85afa2477e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b70000a624e1f0ab245318ef70"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ac7404b40c43f0278dab9cad60"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ce10224f05c3648a774f83cd54"`,
    );
    await queryRunner.query(`DROP TABLE "agents_roles"`);
    await queryRunner.query(`DROP TABLE "properties_tags"`);
    await queryRunner.query(`DROP TABLE "properties_facilities"`);
    await queryRunner.query(`DROP TABLE "properties"`);
    await queryRunner.query(`DROP TABLE "currencies"`);
    await queryRunner.query(`DROP TABLE "properties_approvals"`);
    await queryRunner.query(`DROP TABLE "admins"`);
    await queryRunner.query(`DROP TABLE "agents"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "addresses"`);
    await queryRunner.query(`DROP TABLE "facilities"`);
    await queryRunner.query(`DROP TABLE "images"`);
    await queryRunner.query(`DROP TABLE "tags"`);
  }
}
