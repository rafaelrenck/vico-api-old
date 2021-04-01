import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableUnique,
  TableForeignKey,
} from 'typeorm';

export class CreateUsers1616611433059 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'password_is_temporary',
            type: 'boolean',
            default: 'true',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'expose_email',
            type: 'boolean',
            default: 'true',
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'expose_phone',
            type: 'boolean',
            default: 'true',
          },
          {
            name: 'date_of_birth',
            type: 'date',
          },
          {
            name: 'expose_birthday',
            type: 'boolean',
            default: 'true',
          },
          {
            name: 'gender',
            type: 'enum',
            enumName: 'gender',
            enum: ['Masculino', 'Feminino', 'Não Informado'],
            default: `'Não Informado'`, // eslint-disable-line quotes
            isNullable: false,
          },
          {
            name: 'rg',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'cpf',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'pis',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'type',
            type: 'enum',
            enumName: 'type',
            enum: ['Funcionário', 'Prestador', 'Ambos'],
            default: `'Funcionário'`, // eslint-disable-line quotes
            isNullable: false,
          },
          {
            name: 'role',
            type: 'uuid',
          },
          {
            name: 'board',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'board_registry',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'digital_sign',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'text_sign',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'photo',
            type: 'varchar',
            isNullable: true,
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
      }),
      true
    );

    const roleForeignKey = new TableForeignKey({
      columnNames: ['role'],
      referencedColumnNames: ['id'],
      referencedTableName: 'roles',
      onDelete: 'CASCADE',
    });

    const boardForeignKey = new TableForeignKey({
      columnNames: ['board'],
      referencedColumnNames: ['id'],
      referencedTableName: 'boards',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKeys('users', [
      roleForeignKey,
      boardForeignKey,
    ]);

    const nameUniqueConstraints = new TableUnique({
      columnNames: ['name', 'date_of_birth'],
    });

    const boardUniqueConstraints = new TableUnique({
      columnNames: ['board', 'board_registry'],
    });

    await queryRunner.createUniqueConstraints('users', [
      nameUniqueConstraints,
      boardUniqueConstraints,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
