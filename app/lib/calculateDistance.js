module.exports = (testCentre, lat2, lon2) => {
  const radlat1 = (Math.PI * testCentre.location.lat) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = testCentre.location.lng - lon2;
  const radtheta = (Math.PI * theta) / 180;
  // eslint-disable-next-line max-len
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = (dist * 60) * 1.1515;
  return dist;
};
