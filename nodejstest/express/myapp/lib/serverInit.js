const mongoose = require('mongoose');
const config = require('config-lite')(__dirname);


module.exports = async function(){
    if (mongoose.connection.readyState === 0) {
        // ERROR
        mongoose.connection.on("error", function (err) {
          console.error(err);
          console.info("Exit process.");
        //   process.exit(1);
        });
        await mongoose.connect(config.mongodb);
        console.log('启用了数据库')
        console.warn("Database connected.");
      }
}


