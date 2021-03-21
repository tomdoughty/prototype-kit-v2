const express = require('express');
const postcodes = require('node-postcodes.io');

const getTestCentres = require('../lib/getTestCentres');
const getTestCentre = require('../lib/getTestCentre');
const mapResults = require('../lib/mapResults');

const router = express.Router();

router.get('/testCentres', async (_, res) => res.json(await getTestCentres()));

router.get('/results', async (req, res) => {
  const { postcode } = req.query;

  try {
    const { result: { latitude, longitude } } = await postcodes.lookup(req.query.postcode);
    const data = await getTestCentres();
    const results = mapResults(data, latitude, longitude);

    return res.render('v1/results', {
      postcode,
      results,
    });
  } catch (error) {
    console.log(error);
    // Return no results if anything fails
    return res.render('v1/results', {
      postcode: postcode || '',
      results: [],
    });
  }
});

router.get('/results/:id', async (req, res) => {
  try {
    const testCentre = await getTestCentre(req.params.id);
    return res.render('v1/testCentre', {
      testCentre,
    });
  } catch (error) {
    return res.status(404);
  }
});

module.exports = router;
