import app from './app';
import config from './app/config';

import mongoose from 'mongoose';
const PORT=3000

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
<<<<<<< HEAD
    app.listen(PORT, () => {
      console.log(`Example app listening on port 3000`);
=======
    app.listen(7000, () => {
      console.log(`Example app listening on port 7000`);
>>>>>>> da9b67084d63d6472d9ca5258dcc9d85ff1f2826
    });
  } catch (error) {
    console.log(error);
  }
}
main();