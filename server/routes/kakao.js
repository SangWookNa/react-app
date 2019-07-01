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

  const url = 'https://kauth.kakao.com/oauth/token';

  var data = qs.stringify({
    'grant_type': grant_type,
    'client_id': client_id,
    'redirect_uri': redirect_uri,
    'code': code
  });

  return axios.post(url, data).then((result) => {
    return res.json(result.data);

  }).catch((error) => {
    if (error) throw error;
  })
});

/**
 * 
 */
router.post('/me', (req, res) => {
  const url = 'https://kapi.kakao.com/v1/user/me';

  axios.defaults.headers.common['Authorization'] = `Bearer ${req.body.token}`
  axios.get(url).then((result) => {

    // ALTER SESSION
    let session = req.session;

    session.loginInfo = {
      _id: result.data.id,
      email: result.data.kaccount_email,
      nickname: result.data.properties.nickname,
      access_token: req.body.token
    };

    return res.json(session.loginInfo);

  }).catch((error) => {
    // handle error
    winston.log('error', JSON.stringify(error.data));
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
  const url = 'https://kapi.kakao.com/v1/user/access_token_info';
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${req.session.loginInfo.access_token}`
  axios.get(url).then((result) => {
    return res.json({ info: req.session.loginInfo });

  }).catch((error) => {
    // handle error
    winston.log('error', JSON.stringify(error.data));
    return res.status(401).json({
      error: 1
    });
  })

});

/**
 * 
 */
router.post('/logout', (req, res) => {

  const url = 'https://kapi.kakao.com/v1/user/logout';

  req.session.destroy(err => { if (err) throw err; });

  axios.defaults.headers.common['Authorization'] = `Bearer ${req.body.token}`
  axios.post(url).then((result) => {
    
    return res.json(result.data);

  }).catch((error) => {
    // handle error
    winston.log('error', JSON.stringify(error.data));
    if (error) throw error;
  })

});

/**
 * 
 */
router.post('/tokeninfo', (req, res) => {
  console.log(req.body.token);

  const url = 'https://kapi.kakao.com/v1/user/access_token_info';

  axios.defaults.headers.common['Authorization'] = `Bearer ${req.body.token}`
  axios.get(url).then((result) => {
    console.log('SUCCESS');
    return res.json(result.data);

  }).catch((error) => {
    // handle error
    console.log('ERROR');
    if (error) throw error;
  })

});

/**
 * 
 */
router.post('/unlink', (req, res) => {
  console.log(req.body.token);

  const url = 'https://kapi.kakao.com/v1/user/unlink';


  axios.defaults.headers.common['Authorization'] = `Bearer ${req.body.token}`
  axios.post(url).then((result) => {
    console.log('SUCCESS');
    console.log(result);
    return res.json(result.data);

  }).catch((error) => {
    // handle error
    console.log('ERROR');
    console.log(error);
    if (error) throw error;
  })

});


export default router;