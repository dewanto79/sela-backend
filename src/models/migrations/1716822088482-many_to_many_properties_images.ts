import { MigrationInterface, QueryRunner } from 'typeorm';

export class ManyToManyPropertiesImages1716822088482
  implements MigrationInterface
{
  name = 'ManyToManyPropertiesImages1716822088482';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "properties_images" ("property_id" uuid NOT NULL, "image_id" uuid NOT NULL, CONSTRAINT "PK_9a5fcaf4dae568261c5e9eb19c4" PRIMARY KEY ("property_id", "image_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0316cfa2f097423a91dc5a99e8" ON "properties_images" ("property_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_34f4147c4399cdea72db12d051" ON "properties_images" ("image_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_images" ADD CONSTRAINT "FK_0316cfa2f097423a91dc5a99e89" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_images" ADD CONSTRAINT "FK_34f4147c4399cdea72db12d0516" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "properties_images" DROP CONSTRAINT "FK_34f4147c4399cdea72db12d0516"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties_images" DROP CONSTRAINT "FK_0316cfa2f097423a91dc5a99e89"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_34f4147c4399cdea72db12d051"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0316cfa2f097423a91dc5a99e8"`,
    );
    await queryRunner.query(`DROP TABLE "properties_images"`);
  }
}
