
//In case of authenticated database
/*function seed(dbName, user, password) {
    db = db.getSiblingDB(dbName);
    db.createUser({
      user: user,
      pwd: password,
      roles: [{ role: 'readWrite', db: dbName }],
    });
  
    db.createCollection('api_keys');
    db.createCollection('roles');
  
    db.api_keys.insert({
      metadata: "To be used in the demo created by Raed",
      key: "MRUSDerB5a7WvyAEt4n8IrtToSHzK7Uj",
      version: 1,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  
    db.roles.insertMany(clea);
  }
  
  seed('demo-aos-medraedbesbes', 'aosdemoraed-db-user', 'raed1301');
  
  */