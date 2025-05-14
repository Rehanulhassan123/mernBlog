export const cookieExtractor = function (req) {
  const tokenFromHeader =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1] // Extract the token
      : null;

  if (tokenFromHeader) {
    console.log(tokenFromHeader);
    return tokenFromHeader;
  }

  return req.cookies ? req.cookies?.["accessToken"] : null;
};
