import app from '@app';
import mongoose from 'mongoose';
import config from '@config';

mongoose.set('debug', config.NODE_ENV === 'development');

const uri = `mongodb://${config.MONGO_APP_USER}:${config.MONGO_APP_PWD}@${config.MONGO_HOST}:${config.MONGO_PORT_EXT}/${config.MONGO_DB_NAME}`;

if (config.NODE_ENV !== 'production') console.debug(uri);

mongoose.connect(uri, {}, function (error) {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});

/** Port de l'application */
const port: number = Number(config.APP_PORT_EXT) || 3000;
const server = app.listen(port, () => {
  console.log('Server is running on port ' + port + ' in ' + config.NODE_ENV + ' mode');
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received.');
  server.close(() => {
    console.log('Server closed.');
  });
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed.');
  });
});
