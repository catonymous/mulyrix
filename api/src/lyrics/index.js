import express  from 'express';
import grab from './grab';

const router = express.Router();

router.get('/:artist/:title', (req, res) => {
  const { artist, title } = req.params;
  grab(artist, title).then(lyrics => res.json(lyrics)).catch(error => {
    console.error(error);
    res.json({});
  });
});

export default router;