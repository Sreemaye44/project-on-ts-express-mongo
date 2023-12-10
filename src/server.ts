import app from './app';
import config from './app/config';

import mongoose from 'mongoose';
import { Server } from 'http';

let server: Server;
const PORT = 3000;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(7000, () => {
      console.log(`Example app listening on port 7000`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
//gracefully off the server for unhandle rejectiopn
process.on('unhandledRejection', () => {
  console.log('unhandledRejection is detected, Shutting down ............');
  if (server) {
    server.close(() => process.exit(1));
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('UnCaught Rejection is detected');
  process.exit(1);
});
