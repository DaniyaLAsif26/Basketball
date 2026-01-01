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
    tournamentType: {
        type: String,
        default: "UN-OFFICIAL",
        required: true
    },
    tournamentCategory: {
        type: String,
        required: true
    },
    tournamentLevel: {
        type: String,
        required: true
    },
    tournamentAge: {
        type: String,
        required: true
    },
    tournamentFormat: {
        type: String,
        required: true
    },
    tournamentGender: {
        type: String,
        required: true
    },

    //Date&Time
    tournamentStartDate: {
        type: Date,
        required: true
    },
    tournamentEndDate: {
        type: Date,
        required: true
    },
    tournamentRegistrationDeadline: {
        type: Date,
        required: true
    },

    //location
    tournamentVenue: {
        type: String,
        required: true
    },
    tournamentAddress: {
        type: String,
        required: true
    },
    tournamentCity: {
        type: String,
        required: true
    },
    tournamentDistrict: {
        type: String,
        required: true
    },
    tournamentZipCode: {
        type: String,
        required: true
    },

    //EntryFee
    tournamentEntryFee: {
        type: Number,
        default: null
    },
    tournamentFirstPrize: {
        type: Number,
        default: null
    },
    tournamentSecondPrize: {
        type: Number,
        default: null
    },
    tournamentThirdPrize: {
        type: Number,
        default: null
    },

    //contact info
    tournamentNumber1: {
        type: Number,
        required: true
    },
    tournamentNumber2: {
        type: Number,
        default: null
    },
    tournamentEmail: {
        type: String,
        default: null
    },
    tournamentInstaHandle: {
        type: String,
        default: null
    },
    tournamentInstaHandleUrl: {
        type: String,
        default: null
    },

    //details
    tournamentDescription: {
        type: String,
        required: true
    },
    tournamentHighlights: {
        type: String,
        required: true
    },

    //Admin details
    createdBy: {
        type: String,
        default: 'User',
        required: true
    }
},
    { timestamps: true }
)

export default mongoose.models.Event ||
  mongoose.model("Event", EventSchema);
