import app from './app';
import config from './app/config';

import mongoose from 'mongoose';
const PORT = 3000;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(7000, () => {
      console.log(`Example app listening on port 7000`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
