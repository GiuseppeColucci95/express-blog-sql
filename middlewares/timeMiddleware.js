//function to log time
function timeMiddleware(req, res, next) {

  const date = new Date();
  console.log(date.toISOString() + " - " + req.method + " " + req.url);

  next();
}

//export function
module.exports = timeMiddleware;