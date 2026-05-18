const express =
  require('express');

const router =
  express.Router();

const {

  oauth2Client,
  getAuthUrl

} = require(
  '../services/google.service'
);

const tokenStore =
  require('../../config/googleTokens');

router.get(

  '/google',

  (req, res) => {

    const url =
      getAuthUrl();

    res.redirect(url);
  }
);

router.get(

  '/google/callback',

  async (req, res) => {

    try {

      const code =
        req.query.code;

      const { tokens } =

        await oauth2Client.getToken(
          code
        );

      tokenStore.tokens =
        tokens;

      oauth2Client.setCredentials(
        tokens
      );

      console.log(
        'TOKENS',
        tokens
      );

      res.send(
        'Google Calendar connected'
      );

    } catch (err) {

      console.error(err);

      res.status(500).send(
        'Google auth failed'
      );
    }
  }
);

module.exports =
  router;