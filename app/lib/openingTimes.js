const formatTime = (time) => time
  .replace('00:00am', 'midnight')
  .replace('12:00pm', 'midday')
  .replace(':00', '')
  .replace(/^0+/, '')
  .replace(':', '.');

const formatOpeningTimes = (times) => {
  try {
    const [open, closed] = times.split(' - ');
    return `${formatTime(open)} to ${formatTime(closed)}`;
  } catch (error) {
    return times;
  }
};

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
        text: formatOpeningTimes(testCentre.hoursOfOperation[key]),
      },
    ]));
};
