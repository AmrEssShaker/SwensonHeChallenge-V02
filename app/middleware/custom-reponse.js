const SUCCESS_STATUS = "SUCCESS";

module.exports = {
  /**
   * Send success reponse
   */
  sendSuccess(data = null, message) {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  },

  /**
   * Send failure reponse
   */
  sendFailure(message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message }),
    };
  },
};
