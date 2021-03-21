module.exports = (testCentre, lineBreak = false) => [
  testCentre.address,
  testCentre.addressLine2,
  testCentre.town,
  testCentre.postCode,
].filter(Boolean).join(lineBreak ? '<br>' : ', ');
