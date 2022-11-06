const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
        account: { type: String, lowercase: true },
        machineId: { type: String },
        name: String,
        avatar: String,
        email: String,
        phoneNumber: String,
        password: String,
        address: String,
        facebookId: String,
        userType: { type: Number, default: 0 },
        birth: { type: Number, default: 0 },
        gender: { type: Number, default: 0 },
        registerDate: { type: Number, default: 0 },
        status: { type: Number, default: 1 },
        lastLogin: { type: Number, default: Date.now() },
        workShift: { type: String, default: "08:00" },
        userRole: { type: Number, default: 1 },
        description: String,
        hobby: String,
        hometown: String,
        university: String,
        discordId: String,
        clickupId: String,
        departmentId: {
            type: mongoose.Types.ObjectId,
            ref: "Department",
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
) ; 

module.exports = mongoose.model('users', UserSchema)