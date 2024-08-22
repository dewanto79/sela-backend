import { runSeeders } from 'typeorm-extension';
import { connectionSource } from './ormdatasource';

connectionSource.initialize().then(async () => {
  console.log('seeder running...');
  await runSeeders(connectionSource);
  console.log('seeding done!');
  process.exit();
});
