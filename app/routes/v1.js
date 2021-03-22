const express = require('express');

const getFilters = require('../lib/getFilters');
const getTestCentres = require('../lib/getTestCentres');
const getTestCentre = require('../lib/getTestCentre');
const mapResults = require('../lib/mapResults');
const getLatLong = require('../lib/getLatLong');

const router = express.Router();

router.get('/testCentres', async (_, res) => res.json(await getTestCentres()));

router.get('/results', async (req, res) => {
  const { filters, checkedFilters } = getFilters(req);

  let viewModel = {
    checkedFilters,
    filters,
    latitude: 0,
    longitude: 0,
    postcode: req.query.postcode || '',
    results: [],
  };

  try {
    const { result: { latitude, longitude } } = await getLatLong(viewModel.postcode);
    const rawTestCentres = await getTestCentres();
    const results = mapResults(rawTestCentres, checkedFilters, latitude, longitude);
    const resultsCoordinates = results.map(({ location: { lng, lat } }) => [lng, lat]);

    viewModel = {
      ...viewModel,
      latitude,
      longitude,
      results,
      resultsCoordinates,
    };
  } catch (error) {
    console.log(error);
  }

  return res.render('v1/results', {
    ...viewModel,
  });
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
