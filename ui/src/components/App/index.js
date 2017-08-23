module.exports = require(`./App.${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}`);
