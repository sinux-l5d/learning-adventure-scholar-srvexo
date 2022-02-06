import express from 'express';

/**
 * Application express gérant les appelles aux fonctions en fonction du chemin
 */
const app = express();

// Désactive le header indiquant que c'est une application express
app.disable('x-powered-by');

app.get('/', (req, res) => {
  // Return JSON with status 200
  res.status(200).send({ message: 'Hello World !' });
});

/**
 * Application hydraté avec tout les middlewares
 */
export default app;
