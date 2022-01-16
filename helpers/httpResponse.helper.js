class HttpResponse {
  static badRequest(error, data) {
    return {
      statusCode: 400,
      success: false,
      message: error?.message ?? error,
      data,
    };
  }

  static serverError(error, data) {
    return {
      statusCode: 500,
      success: false,
      message: error?.message ?? error,
      data,
    };
  }

  static ok(message, data) {
    return {
      statusCode: 200,
      success: true,
      message: message,
      data: data,
    };
  }

  static notFound(error, data) {
    return {
      statusCode: 404,
      success: false,
      message: error.message ?? error,
      data,
    };
  }

  static unauthorized(error, data) {
    return {
      statusCode: 401,
      success: false,
      message: error.message ?? error,
      data,
    };
  }
}

module.exports = { HttpResponse };
