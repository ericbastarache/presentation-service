var request = require('request')

exports.verifyToken = async (token) => {
    return new Promise(function(resolve, reject) {
        // Do async job
        request({
            url: "http://localhost:3002/verify",
            method: "POST",
            json: true,
            body: {token}
        }, function(err, resp, body) {
          if (err) {
            reject(err);
          } else {
            resolve(body);
          }
        })
      })
    }
