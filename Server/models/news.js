import mongoose from "mongoose";
const Schema = mongoose.Schema


const NewsSchema = new Schema({
    newsImage: {
        type: String,
        required: true
    },
    newsHeadline: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

export default mongoose.models.News || mongoose.model("News", NewsSchema)