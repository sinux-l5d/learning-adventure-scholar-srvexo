import app from '@app';

/** Port par défaut */
const port = 3000;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
