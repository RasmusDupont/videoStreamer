const util = require('util');

function logCreator (subject) {
  const errorLog = (topic, err, comment) => {
    if(err.response && err.response && err.response.toJSON()) {
      err = err.response.toJSON();
    }

    if (comment) {
      console.error(`## ***error*** ## ${subject}: ${topic}~~ comment: ${comment} ## ${util.inspect(err, {showHidden: false, depth: null}).toString()} ## endError`);
    } else {
      console.error(`## ***error*** ## ${subject}: ${topic} ## ${util.inspect(err, {showHidden: false, depth: null})} ## endError`);
    }
  };

  const infoLog = (topic, info, something) => {
    if (!something) {
      console.info(`## ***info*** ## ${subject}: ${topic} ## ${info} ##endInfo`);
    } else {
      console.error(`## ***info*** ## ${subject}: ${topic} ## ${info} ${util.inspect(something, {showHidden: false, depth: null})} ## endError`);
    }
  };

  return {errorLog, infoLog};
}

module.exports = {
  logCreator
};