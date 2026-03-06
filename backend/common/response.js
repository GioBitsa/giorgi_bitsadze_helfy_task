const CustomResponse = (res, status, message = null, data = null) => {
  const response = { status };

  if (message) response.message = message;
  if (data) response.data = data;

  return res.status(status).json(response);
};

export default CustomResponse;
