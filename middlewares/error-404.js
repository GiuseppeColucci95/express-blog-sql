//404 error function
function notFound(req, res, next) {

  //return the 404 error
  res.status(404).json({
    error: "404 Not found",
    message: "Page not found"
  });
}

//export the function
module.exports = notFound;