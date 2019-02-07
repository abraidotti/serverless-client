const request = require('request');
const schedule = require('node-schedule');

const machineId = '1';

console.log('Client is running.');

schedule.scheduleJob('*/5 * * * *', () => {
  const date = new Date();

  request.post('https://oagfppjnva.execute-api.us-east-1.amazonaws.com/dev/ping', {
    json: {
      machineId,
      time: date,
    },
  }, (error, res, body) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`statusCode: ${res.statusCode}`);
    console.log(body);
  });
});
