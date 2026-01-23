import mongoose from "mongoose";
const Schema = mongoose.Schema

const EventSchema = new Schema({
    tournamentName: {
        type: String,
        required: true
    },
    tournamentImage: {
        type: String,
        default: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80"
    },
    type: {
        type: String,
        default: "UN-OFFICIAL",
        required: true
    },
    category: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    ageCategory: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    },

    //Date&Time
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    registrationDeadline: {
        type: Date,
        required: true
    },

    //location
    venueName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },

    //EntryFee
    entryFee: {
        type: Number,
        default: null
    },
    firstPrize: {
        type: Number,
        default: null
    },
    secondPrize: {
        type: Number,
        default: null
    },
    thirdPrize: {
        type: Number,
        default: null
    },

    //contact info
    phone1: {
        type: Number,
        required: true
    },
    phone2: {
        type: Number,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    instagram: {
        type: String,
        default: null
    },
    instagramLink: {
        type: String,
        default: null
    },

    //details
    description: {
        type: String,
        required: true
    },
    highlights: {
        type: [String],
        required: true
    },

    //Admin details
    createdBy: {
        type: String,
        default: 'User',
        required: true
    },

    hostedUser:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},
    { timestamps: true }
)

export default mongoose.models.Event ||
    mongoose.model("Event", EventSchema);
