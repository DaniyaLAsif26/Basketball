import mongoose, { Mongoose } from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    // Basic Details
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
    gender: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: ''
    },
    profilePicture: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/2348/2348811.png'
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    homeTown: {
        type: String,
        default: ''
    },
    dateOfBirth: {
        type: Date,
        default: null
    },

    // Physical Attributes
    height: {
        type: String,
        default: null
    },
    weight: {
        type: String,
        default: null
    },
    wingspan: {
        type: String,
        default: null
    },
    playerPosition: {
        type: String,
        default: ''
    },

    ranking: {
        currentRanking: {
            type: Number,
            default: null
        },
        rankingPoints: {
            type: Number,
            default: null
        }
    },

    // Tournaments Participated (Admin managed) - Year wise
    tournamentsParticipated: {
        type: Map,
        of: [
            {
                name: {
                    type: String,
                    required: true
                },
                stats: {
                    teamPosition: {
                        type: Number,
                        default: '',
                    },
                    points: {
                        type: Number,
                        default: '',
                    },
                    assists: {
                        type: Number,
                        default: '',
                    },
                    rebounds: {
                        type: Number,
                        default: '',
                    },
                    matchesPlayed: {
                        type: Number,
                        default: '',
                    },
                }
            }
        ],
        default: {}
    },

},
    {
        timestamps: true
    })

export default mongoose.models.User || mongoose.model("User", UserSchema)