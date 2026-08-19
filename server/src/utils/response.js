export function successResponse(res, message = 'Success', data = {}, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

export function errorResponse(res, message = 'An error occurred', statusCode = 500, errors = null) {
  const response = {
    success: false,
    message
  };
  if (errors) {
    response.errors = errors;
  }
  return res.status(statusCode).json(response);
}

export function paginatedResponse(res, message = 'Success', items = [], pagination = {}, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data: {
      items,
      pagination
    }
  });
}
