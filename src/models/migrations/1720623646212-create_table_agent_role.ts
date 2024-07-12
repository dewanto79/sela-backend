import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAgentRole1720623646212 implements MigrationInterface {
  name = 'CreateTableAgentRole1720623646212';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
      `DROP INDEX "public"."IDX_ac7404b40c43f0278dab9cad60"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ce10224f05c3648a774f83cd54"`,
    );
    await queryRunner.query(`DROP TABLE "agents_roles"`);
  }
}
