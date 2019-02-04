const env = {
  database: 'dream_society',
  username: 'client_user',
  password: 'client123',
  host: 'localhost',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  idle: 10000
  }
};
 
module.exports = env;
