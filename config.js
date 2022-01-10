const API_PORT = process.env.PORT || 5001;
const ENV = 'dev';
const APP_URL_DEV = 'http://localhost:3000';
const APP_URL_PROD = 'http://web5days.com';
// const DB_CONNECTION = 'mongodb://localhost:27017/demo-app';
const DB_CONNECTION = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb_host:27017/demo-app?authSource=admin`
const JWT_KEY = 'demo-app';
const SEND_GRID_KEY =
    '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';
const EMAIL_AUTH = {
  MAIL_USER: 'system.email.vn@gmail.com',
  MAIL_PASS: 'hophop01'
};

module.exports={
  SEND_GRID_KEY
}


