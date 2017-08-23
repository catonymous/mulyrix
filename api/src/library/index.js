import express  from 'express';
import fs from 'fs';
import scan from './scan';

const router = express.Router();

router.MEDIA_DIR = '../media';
router.MEDIA_URL = '/media';
const stateFile = `${router.MEDIA_DIR}/library.json`;

router.get('/scan', (req, res) => scan(router.MEDIA_DIR, router.MEDIA_URL)
    .then(data => fs.writeFile(stateFile, JSON.stringify(data), error => {
        if(error) {
            console.error(error);
        }
        res.json(data);
    }))
	.catch(error => {
        console.error(error);
        res.json({});
    })
);

router.get('/check', (req, res) => fs.readFile(stateFile, (error, data) => {
    if(error) {
        console.error(error);
        return res.json({});
    }
    res.json(JSON.parse(data));
}));

export default router;
