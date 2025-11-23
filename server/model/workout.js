let mongoose = require('mongoose')

// create a workout model
let workoutModel = mongoose.Schema({
    exerciseName: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true,
        min: 1
    },
    reps: {
        type: Number,
        required: true,
        min: 1
    },
    weight: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        default: ""
    }
},
{
    collection: "workouts"
});

module.exports = mongoose.model('Workout', workoutModel);