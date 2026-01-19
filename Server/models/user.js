import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    uniqueId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/2348/2348811.png'
    }
})

export default mongoose.models.User || mongoose.model("User", UserSchema)
