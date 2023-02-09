const serverless = require('serverless-http');
const app = require('./app');

// 返回输入参数
const handler = serverless(app);
exports.main = async (event, context) => {
  // you can do other things here
  const result = await handler(event, context);
  // and here
  console.log(result);
  return result;
};

