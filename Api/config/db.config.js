const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stravahack'

mongoose.connect(MONGODB_URI)
  .then(() => console.log(`Successfully connected to the database ${MONGODB_URI}`))
  .catch(error => console.error(`An error ocurred trying to connect to ${MONGODB_URI}`, error))

  //MONGODB_URI = 'mongodb+srv://wijaman23:Cambiar2006@cluster0.8v1rrgx.mongodb.net/strava-hack?retryWrites=true&w=majority'