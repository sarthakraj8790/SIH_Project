import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1709840000000 implements MigrationInterface {
    name = 'CreateInitialTables1709840000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "name" character varying,
                "avatar" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "alerts" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "type" character varying NOT NULL,
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "read" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" uuid NOT NULL,
                CONSTRAINT "PK_8f4fd4c36d9308ad4c56b885d4c" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "reports" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "data" jsonb,
                "type" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" uuid NOT NULL,
                CONSTRAINT "PK_125a1e48797e2c91d4d2c6b9e4d" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "wallet_analyses" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "address" character varying NOT NULL,
                "riskScore" double precision NOT NULL,
                "flags" jsonb NOT NULL,
                "patterns" jsonb NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" uuid NOT NULL,
                CONSTRAINT "PK_7e1c6f8f9c8b4c9e9d2c6b9e4d" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "suspicious_transactions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "transactionHash" character varying NOT NULL,
                "walletAddress" character varying NOT NULL,
                "ipAddress" character varying NOT NULL,
                "latitude" double precision NOT NULL,
                "longitude" double precision NOT NULL,
                "location" character varying NOT NULL,
                "riskScore" double precision NOT NULL,
                "details" jsonb NOT NULL,
                "timestamp" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" uuid NOT NULL,
                CONSTRAINT "PK_9d8f4c36d9308ad4c56b885d4c" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            ALTER TABLE "alerts" ADD CONSTRAINT "FK_alerts_users" 
            FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "reports" ADD CONSTRAINT "FK_reports_users" 
            FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "wallet_analyses" ADD CONSTRAINT "FK_wallet_analyses_users" 
            FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "suspicious_transactions" ADD CONSTRAINT "FK_suspicious_transactions_users" 
            FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "suspicious_transactions" DROP CONSTRAINT "FK_suspicious_transactions_users"`);
        await queryRunner.query(`ALTER TABLE "wallet_analyses" DROP CONSTRAINT "FK_wallet_analyses_users"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_reports_users"`);
        await queryRunner.query(`ALTER TABLE "alerts" DROP CONSTRAINT "FK_alerts_users"`);
        await queryRunner.query(`DROP TABLE "suspicious_transactions"`);
        await queryRunner.query(`DROP TABLE "wallet_analyses"`);
        await queryRunner.query(`DROP TABLE "reports"`);
        await queryRunner.query(`DROP TABLE "alerts"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}