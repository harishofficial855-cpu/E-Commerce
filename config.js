// Configuration for MongoDB connection
module.exports = {
	mongoUser: process.env.MONGO_USER || 'harishofficial855_db_user',
	mongoPass: process.env.MONGO_PASS || 'o3ix4htpC3poMjwk',
	// Set MONGO_HOST to your Atlas cluster host (e.g. cluster0.abcde.mongodb.net)
	mongoHost: process.env.MONGO_HOST || '',
	mongoDbName: process.env.MONGO_DB || 'ecommerce_db',
	port: process.env.PORT || 5000,
};
