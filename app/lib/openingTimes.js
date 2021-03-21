/* eslint-disable sort-keys */
module.exports = (testCentre) => {
  const days = {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday',
  };

  return Object.entries(days)
    .filter(([key]) => testCentre.hoursOfOperation[key])
    .map(([key, value]) => ([
      {
        text: value,
      },
      {
        text: testCentre.hoursOfOperation[key],
      },
    ]));
};
