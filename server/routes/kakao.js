import express from 'express';
import path from 'path';
import winston from '../config/winston'

const router = express.Router();

/**
 * READ ADDITIONAL VIDEO: GET /api/video/:username/:invitee/:seq
 */
router.get('/test', (req, res) => {
console.log('testtttttttttttttttttttttttttttttttt');
    
});


export default router;