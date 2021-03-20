module.exports = (result) => ({
  ...result,
  fullAddress: [
    result.address,
    result.addressLine2,
    result.town,
    result.postcode,
  ].filter(Boolean).join(', '),
});
