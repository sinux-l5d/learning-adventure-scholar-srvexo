import app from '@app';
import { config } from 'dotenv';
import mongoose from 'mongoose';

config({ path: '.env' });

const uri = `mongodb://${process.env.MONGO_APP_USER}:${process.env.MONGO_APP_PWD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT_EXT}/${process.env.MONGO_DB_NAME}`;

if (process.env.NODE_ENV !== 'production') console.debug(uri);

mongoose.connect(uri, {}, function (error) {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});

/** Port par défaut */
const port = 3000;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
