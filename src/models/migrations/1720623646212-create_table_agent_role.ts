import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAgentRole1720623646212 implements MigrationInterface {
  name = 'CreateTableAgentRole1720623646212';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "agents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_5fdef501c63984b1b98abb1e68c" UNIQUE ("email"), CONSTRAINT "PK_9c653f28ae19c5884d5baf6a1d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'active', CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "agents_roles" ("agent_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_19dc7ac69a6705be0a618d29904" PRIMARY KEY ("agent_id", "role_id"))`,
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
    await queryRunner.query(`DROP TABLE "agents_roles"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "agents"`);
  }
}
