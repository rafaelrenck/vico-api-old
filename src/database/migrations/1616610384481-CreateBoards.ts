import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class CreateBoards1616610384481 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'boards',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'board',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
      })
    );

    const foreignKey = new TableForeignKey({
      columnNames: ['state'],
      referencedColumnNames: ['id'],
      referencedTableName: 'states',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKey('boards', foreignKey);

    const uniqueConstraint = new TableUnique({
      columnNames: ['board', 'state'],
    });

    await queryRunner.createUniqueConstraint('boards', uniqueConstraint);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('boards');
  }
}
