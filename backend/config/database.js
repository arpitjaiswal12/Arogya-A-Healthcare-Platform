const mongoose = require("mongoose");
require("dotenv").config();


console.log(process.env.DATA_BASE_URL)

exports.connect = () => {
	mongoose.connect(process.env.DATA_BASE_URL)
    .then(() => console.log("DataBase Connection is Successfull !! "))
    .catch( (error) => {
        console.log("Issue in DataBase Connection");
        console.error(error.message);
        process.exit(1);
    } );
};
