import express from 'express';
import axios from 'axios';
import qs from 'query-string';
import winston from '../config/winston'

const router = express.Router();

/**
 * 
 */
router.post('/', (req, res) => {

  let grant_type = 'authorization_code';
  let client_id = '9e7171f1d9599641378cd3e36174adbc';
  let redirect_uri = 'http://localhost:3000/oauth';
  let code = req.body.code;

  var data = qs.stringify({
    'grant_type': grant_type,
    'client_id': client_id,
    'redirect_uri': redirect_uri,
    'code': code
  });

  return axios.post('https://kauth.kakao.com/oauth/token', data).then((result) => {
    return res.json(result.data);

  }).catch((error) => {
    // handle error
    winston.log('error', JSON.stringify(error.response.data));
    if (error) throw error;
  })
});

/**
 * 
 */
router.post('/me', (req, res) => {

  axios.defaults.headers.common['Authorization'] = `Bearer ${req.body.token}`
  axios.get('https://kapi.kakao.com/v1/user/me').then((result) => {

    // ALTER SESSION
    let session = req.session;

    session.loginInfo = {
      userid: result.data.id,
      email: result.data.kaccount_email,
      nickname: result.data.properties.nickname,
      access_token: req.body.token
    };

    return res.json(session.loginInfo);

  }).catch((error) => {
    // handle error
    winston.log('error', JSON.stringify(error.response.data));
    if (error) throw error;
  })

});
/**
 * GET CURRENT USER INFO GET /api/kakao/getInfo
 */
router.post('/getinfo', (req, res) => {
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: 1
    });
  }
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${req.session.loginInfo.access_token}`
  axios.get('https://kapi.kakao.com/v1/user/access_token_info').then((result) => {
    return res.json({ info: req.session.loginInfo });

  }).catch((error) => {
    // handle error
    winston.log('error', JSON.stringify(error.response.data));
    return res.status(401).json({
      error: 1
    });
  })

});

/**
 * 
 */
router.post('/logout', (req, res) => {

  req.session.destroy(err => { if (err) throw err; });

  axios.defaults.headers.common['Authorization'] = `Bearer ${req.body.token}`
  axios.post('https://kapi.kakao.com/v1/user/logout').then((result) => {
    
    return res.json(result.data);

  }).catch((error) => {
    // handle error
    winston.log('error', JSON.stringify(error.response.data));
    if (error) throw error;
  })

});

/**
 * 
 */
router.post('/send', (req, res) => {

  axios.defaults.headers.common['Authorization'] = `Bearer ${req.body.token}`

  var data = qs.stringify({
    'template_object': JSON.stringify(req.body.data),
  });  

  axios.post('https://kapi.kakao.com//v2/api/talk/memo/default/send', data ).then((result) => {
    return res.json(result.data);

  }).catch((error) => {
    // handle error
    winston.log('error', JSON.stringify(error.response.data));
    return res.json(error.response.data);
  })

});

/**
 * 
 */
router.post('/tokeninfo', (req, res) => {
  console.log(req.body.token);

  axios.defaults.headers.common['Authorization'] = `Bearer ${req.body.token}`
  axios.get('https://kapi.kakao.com/v1/user/access_token_info').then((result) => {
    console.log('SUCCESS');
    return res.json(result.data);

  }).catch((error) => {
    // handle error
    winston.log('error', JSON.stringify(error.response.data));
    if (error) throw error;
  })

});

/**
 * 
 */
router.post('/unlink', (req, res) => {

  axios.defaults.headers.common['Authorization'] = `Bearer ${req.body.token}`
  axios.post('https://kapi.kakao.com/v1/user/unlink').then((result) => {
    console.log('SUCCESS');
    return res.json(result.data);

  }).catch((error) => {
    // handle error
    winston.log('error', JSON.stringify(error.response.data));
    if (error) throw error;
  })

});


export default router;