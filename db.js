const mongoose = require('mongoose');

const uri = `mongodb+srv://${{secrets.MONGO_DB_USER}}:${{secrets.MONGO_DB_PASSWORD}}@cluster0-pswsd.mongodb.net/test?retryWrites=true&w=majority`;
const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB connected-- ${conn.connection.host}`);
    } catch (err) {
        console.log('Error-- '+err.message);
    }
}

module.exports = connectDB;
