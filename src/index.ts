import app from '@app';
import { config } from 'dotenv';

config({ path: '.env' });

/** Port par défaut */
const port = 3000;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
