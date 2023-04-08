const configs = require("../../configs");

module.exports = {
    servers: [
        {
            url: `http://localhost:4000/api/${configs.apiVersion}`, // url
            description: "Local server", // name
        },
    ]
}