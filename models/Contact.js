const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: 3,
        maxLength: 20,
        trim: true,
        validate: {
            validator: function (value) {
                const nameRegex = /^[a-zA-Z\s]*$/;
                return nameRegex.test(value);
            },
            message: 'First name must contain only alphabetical character',
        }
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
    },
    emailAddress: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        unique: true
    },
    age: {
        type: Number,
        required: false,
        trim: true
    }
})


module.exports = mongoose.model("Contact", contactSchema);