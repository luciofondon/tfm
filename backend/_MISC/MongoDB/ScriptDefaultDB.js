
conn = new Mongo("localhost");
db = conn.getDB("tfm");

var users = [
	{
		"name" : "Administrador",
		"lastName" : "Administrador",
		"rol" : ObjectId("5ad10ee96bc202b82683bd54"),
		"userName" : "admin",
		"email" : "admin@mail.com",
		"created" : new Date(),
		"salt" : "I2O47xf+KFkZOa+eP4fRRw==",
		"hashedPassword" : "ziFIvpsjpkh05TO7JjTNwssyGpBJg4KnekBUJPJzIe6bnKmckcuywPFibQBhbPTPFvdrIksjUM+LaG0OcGpjIg==",
	}
];

var roles = [
	{
		description: "Administrador",
		name: "Administrador",
		level: 1
	},
	{
		description: "Consultor",
		name: "Consultor",
		level: 2
	}
];

db.getCollections('users').insert(users);
db.getCollections('rols').insert(roles);


