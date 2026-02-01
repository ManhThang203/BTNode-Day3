// Xử Lý Tất Cả Errors
const exceptionHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.error(500, err.message, err);
};

module.exports = exceptionHandler;
