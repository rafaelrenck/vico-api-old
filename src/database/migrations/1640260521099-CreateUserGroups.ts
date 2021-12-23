import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUserGroups1640260521099 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_groups_groups',
        columns: [
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'group_id',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
      }),
      true
    );

    const userForeignKey = new TableForeignKey({
      name: 'userForeignKey',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    });

    const groupForeignKey = new TableForeignKey({
      name: 'groupForeignKey',
      columnNames: ['group_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'groups',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKeys('users_groups_groups', [
      userForeignKey,
      groupForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users_groups_groups', 'userForeignKey');
    await queryRunner.dropForeignKey('users_groups_groups', 'groupForeignKey');
    await queryRunner.dropTable('users_groups_groups');
  }
}
