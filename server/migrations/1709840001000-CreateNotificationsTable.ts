import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotificationsTable1709840001000 implements MigrationInterface {
    name = 'CreateNotificationsTable1709840001000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "notifications" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "type" character varying NOT NULL,
                "message" character varying NOT NULL,
                "read" boolean NOT NULL DEFAULT false,
                "timestamp" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" uuid NOT NULL,
                CONSTRAINT "PK_notifications" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            ALTER TABLE "notifications" 
            ADD CONSTRAINT "FK_notifications_users" 
            FOREIGN KEY ("userId") 
            REFERENCES "users"("id") 
            ON DELETE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "notifications" 
            DROP CONSTRAINT "FK_notifications_users"
        `);
        
        await queryRunner.query(`
            DROP TABLE "notifications"
        `);
    }
}