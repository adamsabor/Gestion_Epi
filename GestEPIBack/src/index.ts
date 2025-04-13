import app from './app';

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
