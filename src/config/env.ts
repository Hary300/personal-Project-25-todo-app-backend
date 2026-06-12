if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

if (!process.env.MONGODB_URI) {
  throw new Error('JWT_SECRET is not defined');
}

export const env = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_URI: process.env.MONGODB_URI,
};
