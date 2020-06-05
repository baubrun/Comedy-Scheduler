const {createLogger, transports, format } = require("winston")




const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


const logger = createLogger({
    level: "info",
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.File({
            dirname: "logs",
            filename: "info.log"
        })
    ]
})


module.exports = logger