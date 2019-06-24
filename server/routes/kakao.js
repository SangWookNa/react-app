import express from 'express';
import path from 'path';
import winston from '../config/winston'
import axios from 'axios';

const router = express.Router();

/**
 * READ ADDITIONAL VIDEO: GET /api/video/:username/:invitee/:seq
 */
router.post('/test', (req, res) => {
console.log('testtttttttttttttttttttttttttttttttt');
console.log(req.body.token);


const url = 'https://kapi.kakao.com/v1/user/logout';    
 
 axios.defaults.headers.common['Authorization'] = `Bearer ${req.body.token}` 
 axios.post(url).then((result) => {
   console.log('SUCCESS');    
   console.log(result.data);

 }).catch((error) => {
   // handle error
   console.log('ERROR');    
   console.log(error.response. data);
 })
    
});


export default router;