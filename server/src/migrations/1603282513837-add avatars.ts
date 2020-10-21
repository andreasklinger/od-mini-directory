import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class addAvatars1603280488413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user');
    const avatarColumn = new TableColumn({
      name: 'avatar',
      type: 'string',
      isNullable: false,
      default: 'hi',
    });
    if (table) await queryRunner.addColumn(table, avatarColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user');
    if (table) await queryRunner.dropColumn(table, 'avatar');
  }
}
