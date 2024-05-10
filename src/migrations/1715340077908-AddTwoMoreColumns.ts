import { Task } from "src/tasks/task.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTwoMoreColumns1715340077908 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task" 
            ADD COLUMN "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            ADD COLUMN "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
