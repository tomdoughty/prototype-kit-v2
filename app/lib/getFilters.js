const facilities = {
  assistedTesting: 'Assisted testing',
  braile: 'Braile',
  bslSupport: 'BSL support',
  easyInstructions: 'Easy instructions',
  hasFreeParking: 'Free parking',
  hasPaidParking: 'Paid parking',
  hasToilets: 'Toilets',
  hearingLoops: 'Hearing loops',
  languageTranslation: 'Language translation',
  videoAssistance: 'Video assistance',
  wheelChairAccess: 'Wheelchair access',
};

module.exports = (req) => {
  const filters = Object.entries(facilities)
    .map(([key, value]) => ({
      checked: req.query[key] === 'true',
      text: value,
      value: key,
    }));

  const checkedFilters = filters.filter((filter) => filter.checked);

  return {
    checkedFilters,
    filters,
  };
};
