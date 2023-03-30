const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect('mongodb+srv://sa:sapassword@cluster0.0sb7h9b.mongodb.net/managerestaurant');
        console.log('Connect successful');
    } catch (error) {
        console.log('Connect failure!!');
    }
}

module.exports = { connect };