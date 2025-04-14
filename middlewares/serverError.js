//server error function
function serverError(err, req, res, next) {
  //print in console the error
  console.log(err.stack);

  //return the response with json object
  res.status(500).json({
    error: "Internal server error",
    message: err.message
  });
}

//export the function
module.exports = serverError;