import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablePropertyAddUserId1720755204430
  implements MigrationInterface
{
  name = 'AlterTablePropertyAddUserId1720755204430';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "properties" ADD "agent_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "properties" ADD CONSTRAINT "FK_c406123fe69e47e147b1b4cb030" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "properties" DROP CONSTRAINT "FK_c406123fe69e47e147b1b4cb030"`,
    );
    await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "agent_id"`);
  }
}
