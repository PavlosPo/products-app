const { format, createLogger, transports } = require('winston')
require('winston-daily-rotate-file')
require('winston-mongodb')

require('dotenv').config()

const { combine, timestamp, label, prettyPrint } = format;  // deconstruct

const CATEGORY = "Winston custom format"

const fileRotateTransport = new transports.DailyRotateFile({  // configs the logger file's name
  filename: "logs/rotate-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "14d"
})

const logger = createLogger({
  level : "debug",
  format : combine(
    label({
      label: CATEGORY}),

    timestamp({
      format: "DD-MM-YYYY HH:mm:ss"
    }),
    // format.json()
    prettyPrint()
  ),
  transports: [
    fileRotateTransport,  // the transport we created
    new transports.File({
      filename: "logs/example.log"
    }),
    new transports.File({
      level: "error", // assigned level logger
      filename: "logs/errors.log"
    }),
    new transports.Console(),
    new transports.MongoDB({
      level : "error",
      db : process.env.MONGODB_URI,  // .env file
      options: {  // to stop the errors
        useUnifiedTopology : true
      },
      collection: "server_logs", // it will be automatically created
      format : format.combine(
        format.timestamp(), // it will automatically be saved as 'ISO DATE'
        format.json() 
      )
    })
  ]
})

module.exports = logger;