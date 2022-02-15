const middlewareError = (err, _req, res, _next) => {
  if (err.code) {
    const { code, message } = err;
    return res.status(code).json({ message });
  }
};

module.exports = {
  middlewareError,
}