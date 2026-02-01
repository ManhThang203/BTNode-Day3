// Xử Lý 404 Not Found
const notFoundHandler = (req, res, next) => {
  res.error(404, "Resource not found");
};

module.exports = notFoundHandler;
