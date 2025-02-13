import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

dotenv.config();

const dir = process.env.NODE_ENV == 'migration' ? 'src' : 'dist';
const options: DataSourceOptions & SeederOptions = {
  host: process.env.DATABASE_HOST,
  type: 'mysql',
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrationsTableName: 'migrations',
  logging: false,
  synchronize: false,
  name: 'default',
  entities: [`${dir}/**/*.entity.{js,ts}`],
  migrations: [`${dir}/models/migrations/*.{js,ts}`],
  seeds: [`${dir}/models/migrations/seeds/*.seed.{js,ts}`],
};
export const connectionSource = new DataSource(options);
