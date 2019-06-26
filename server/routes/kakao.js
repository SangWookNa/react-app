import express from 'express';
import axios from 'axios';
import qs from 'query-string';

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
 * READ ADDITIONAL VIDEO: GET /api/video/:username/:invitee/:seq
 */
router.post('/test', (req, res) => {
  console.log(req.body.token);

  const url = 'https://kapi.kakao.com/v1/user/logout';

  axios.defaults.headers.common['Authorization'] = `Bearer ${req.body.token}`
  axios.post(url).then((result) => {
    console.log('SUCCESS');
    return res.json(result.data);

  }).catch((error) => {
    // handle error
    console.log('ERROR');
    if (error) throw error;
  })

});


export default router;