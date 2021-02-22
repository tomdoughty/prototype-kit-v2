const express = require('express');

const router = express.Router();

router.get('/test-route', (_, res) => res.json(res.locals.data));

module.exports = router;
