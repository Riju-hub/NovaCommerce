// import jwt from 'jsonwebtoken';

// export const generateToken = (id, role) => {
//   return jwt.sign({ id, role }, process.env.JWT_SECRET || 'fallbacksecret', {
//     expiresIn: process.env.JWT_EXPIRE || '30d',
//   });
// };

// export const sendTokenResponse = (user, statusCode, res) => {
//   const token = generateToken(user._id, user.role);

//   const days = parseInt(process.env.JWT_COOKIE_EXPIRE, 10) || 30;

//   const options = {
//     expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
//     httpOnly: true,
//   };

//   if (process.env.NODE_ENV === 'production') {
//     options.secure = true;
//   }

//   const userObj = user.toObject ? user.toObject() : { ...user };
//   delete userObj.password;

//   res.status(statusCode).json({
//     success: true,
//     token,
//     user: userObj,
//   });
// };

// export default generateToken;



import jwt from 'jsonwebtoken';

export const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'fallbacksecret', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

export const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id, user.role);

  const days = parseInt(process.env.JWT_COOKIE_EXPIRE, 10) || 30;

  const options = {
    expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  const userObj = user.toObject ? user.toObject() : { ...user };
  delete userObj.password;
  delete userObj.otpCode;
  delete userObj.otpExpire;

  return res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: userObj,
  });
};

export default generateToken;