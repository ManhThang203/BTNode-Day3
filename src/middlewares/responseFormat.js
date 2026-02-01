const responseFormat = (req, res, next) => {
  res.success = (data, status = 200) => {
    res.status(status).json({
      status: "success",
      data,
    });
  };

  res.error = (status, message, error = null) => {
    const response = {
      status: "error",
      message,
    };

    if (error) {
      response.error = error;
    }

    res.status(status).json(response);
  };

  next();
};

module.exports = responseFormat;
