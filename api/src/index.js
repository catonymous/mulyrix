import express from 'express';
import library from './library';
import lyrics from './lyrics';
import proxy, { middleware } from './proxy';

const app = express();

app.use(library.MEDIA_URL, express.static(library.MEDIA_DIR));
app.use('/api/library', library);
app.use('/api/lyrics', lyrics);
app.use(middleware);
app.use('/api/proxy', proxy);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
