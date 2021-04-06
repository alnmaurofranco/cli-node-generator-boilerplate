const handleError = (error, _req, res, next) => {
  console.log(error);
  if (error.status === 404) {
    res.status(404).json({ message: 'Not Found' });
  } else {
    res.status(500).json({ message: 'Something looks wrong' });
  }

  next();
};

module.exports = handleError;
