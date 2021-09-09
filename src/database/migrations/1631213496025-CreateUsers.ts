import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableUnique,
  TableForeignKey,
  TableCheck,
} from 'typeorm';

export class CreateUsers1631213496025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'full_name',
            type: 'varchar',
          },
          {
            name: 'short_name',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'enum',
            enumName: 'type',
            enum: ['Funcionário', 'Prestador', 'Ambos'],
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'date_of_birth',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'show_birthday',
            type: 'boolean',
            default: true,
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
            isNullable: true,
          },
          {
            name: 'pis',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'job_position_id',
            type: 'varchar',
          },
          {
            name: 'board_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'board_state_id',
            type: 'varchar',
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
            default: true,
          },
          {
            name: 'bad_logins',
            type: 'smallint',
            default: 0,
          },
          {
            name: 'blocked',
            type: 'boolean',
            default: false,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
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

    const boardForeignKey = new TableForeignKey({
      name: 'boardForeignKey',
      columnNames: ['board_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'boards',
      onDelete: 'CASCADE',
    });

    const boardStateForeignKey = new TableForeignKey({
      name: 'boardStateForeignKey',
      columnNames: ['board_state_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'states',
      onDelete: 'CASCADE',
    });

    const jobPositionForeignKey = new TableForeignKey({
      name: 'jobPositionForeignKey',
      columnNames: ['job_position_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'job_positions',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKeys('users', [
      boardForeignKey,
      boardStateForeignKey,
      jobPositionForeignKey,
    ]);

    const nameUniqueConstraints = new TableUnique({
      name: 'nameUniqueConstraints',
      columnNames: ['full_name', 'date_of_birth'],
    });

    const boardUniqueConstraints = new TableUnique({
      name: 'boardUniqueConstraints',
      columnNames: ['board_id', 'board_state_id', 'board_registry'],
    });

    await queryRunner.createUniqueConstraints('users', [
      nameUniqueConstraints,
      boardUniqueConstraints,
    ]);

    const employeeCheck = new TableCheck({
      name: 'employeeCheck',
      expression: `type NOT IN ('Funcionário', 'Ambos') OR (cpf IS NOT NULL AND pis IS NOT NULL)`, // eslint-disable-line quotes
    });

    const providerCheck = new TableCheck({
      name: 'providerCheck',
      expression: `type NOT IN ('Prestador', 'Ambos') OR (board_id IS NOT NULL AND board_state_id IS NOT NULL AND board_registry IS NOT NULL)`, // eslint-disable-line quotes
    });

    await queryRunner.createCheckConstraints('users', [
      employeeCheck,
      providerCheck,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'boardForeignKey');
    await queryRunner.dropForeignKey('users', 'boardStateForeignKey');
    await queryRunner.dropForeignKey('users', 'jobPositionForeignKey');
    await queryRunner.dropUniqueConstraint('users', 'nameUniqueConstraints');
    await queryRunner.dropUniqueConstraint('users', 'boardUniqueConstraints');
    await queryRunner.dropCheckConstraint('users', 'employeeCheck');
    await queryRunner.dropCheckConstraint('users', 'providerCheck');
    await queryRunner.dropTable('users');
  }
}
