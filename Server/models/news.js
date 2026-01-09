import mongoose from "mongoose";
const Schema = mongoose.Schema


const NewsSchema = new Schema({
    newsContent: {
        type: String,
        required: true
    },
    newsHeadline: {
        type: String,
        required: true
    },
    newsImage: {
        type: String,
        // required: true,
        default: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80"
    }
},
    { timestamps: true }
)

export default mongoose.models.News || mongoose.model("News", NewsSchema)