const getAuthToken = (request) => {
  const auth = request.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    return auth.replace("Bearer ", "");
  }
  return null;
};

module.exports = getAuthToken;
