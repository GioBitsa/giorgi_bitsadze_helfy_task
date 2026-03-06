const CustomError = (res, status, message = null) => {
  if (status === 500 && !message) {
    message = "Server error...";
  }

  return res.status(status).json(message);
};

export default CustomError;
