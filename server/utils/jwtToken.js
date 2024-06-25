export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  const options = {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: true, 
    sameSite: 'none'
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token
  });
};
