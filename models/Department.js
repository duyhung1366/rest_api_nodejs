const mongoose = require("mongoose")

const DepartmentSchema = mongoose.Schema({
    name: String,
    address: String,
    email: String,
    hotline: String,
    status: { type: Number, default: 1 },
    type: { type: Number, default: 1 },
}, {
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model("Department", DepartmentSchema)