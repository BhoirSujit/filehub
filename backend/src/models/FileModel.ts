import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    size: {
        type: Number,
        required :true
    },
    thumbnail: {
        type: String,
        required: false,
        default: 'none'
    }
}, {timestamps: true})

const fileModel = mongoose.model('Files', fileSchema);

export default fileModel;