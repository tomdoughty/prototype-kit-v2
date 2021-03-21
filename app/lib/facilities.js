module.exports = (testCentre) => {
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

  return Object.entries(facilities)
    .filter(([key]) => testCentre[key])
    .map(([, value]) => value);
};
