import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePropertiesApprovals1720796251387
  implements MigrationInterface
{
  name = 'CreateTablePropertiesApprovals1720796251387';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "properties_approvals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "property_id" uuid NOT NULL, "agent_id" uuid NOT NULL, "status" character varying NOT NULL, "note" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_42c589fbe6d140c7c44a71ccbf3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_approvals" ADD CONSTRAINT "FK_92beba916496b7eea5f268a4ddd" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_approvals" ADD CONSTRAINT "FK_d0b26b777ed7a7032cc618f679e" FOREIGN KEY ("agent_id") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "properties_approvals" DROP CONSTRAINT "FK_d0b26b777ed7a7032cc618f679e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_approvals" DROP CONSTRAINT "FK_92beba916496b7eea5f268a4ddd"`,
    );
    await queryRunner.query(`DROP TABLE "properties_approvals"`);
  }
}
