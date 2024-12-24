const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    // console.error(error.stack);
    res.status(500).json({ message: error.message });
  });
};

export default asyncHandler;
