const request = require('request')
const { createLogger, format, transports } = require('winston')
const schedule = require('node-schedule')

const machineId = '1'

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'serverless-client-ping' },
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: `logs/ping-client-${machineId}.log` })
  ]
})

logger.log({
  level: 'info',
  message: 'Ping client activated.',
  machineId
})

schedule.scheduleJob('*/5 * * * *', () => {
  const date = new Date()

  request.post('https://oagfppjnva.execute-api.us-east-1.amazonaws.com/dev/ping', {
    json: {
      machineId,
      time: date.toISOString()
    }
  }, (error, res, body) => {
    if (error) {
      logger.error('error', new Error(error))
      return
    }
    logger.log({
      level: 'info',
      message: 'Successful ping.',
      statusCode: res.statusCode,
      body: body
    })
  })
})
