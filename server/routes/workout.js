let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
// connect to our workout model
let Workout = require('../model/workout');

// GET route for displaying all workouts --> Read Operation
router.get('/', async (req, res, next) => {
    try {
        const WorkoutList = await Workout.find().sort({ date: -1 });
        res.render('Workouts/list', {
            title: 'My Workouts',
            WorkoutList: WorkoutList
        })
    }
    catch (err) {
        console.log(err);
        res.render('Workouts/list',
            {
                error: 'Error on the Server',
                WorkoutList: []
            }
        )
    }
});

// GET route for displaying the Add Page --> Create Operation
router.get('/add', async (req, res, next) => {
    try {
        res.render('Workouts/add', {
            title: 'Add Workout'
        });
    }
    catch (err) {
        console.log(err);
        res.render('Workouts/list',
            {
                error: 'Error on the Server',
                WorkoutList: []
            }
        )
    }
})

// POST route for processing the Add Page --> Create Operation
router.post('/add', async (req, res, next) => {
    try {
        let newWorkout = Workout({
            "exerciseName": req.body.exerciseName,
            "sets": req.body.sets,
            "reps": req.body.reps,
            "weight": req.body.weight,
            "date": req.body.date,
            "notes": req.body.notes
        })
        Workout.create(newWorkout).then(() => {
            res.redirect('/workouts')
        });
    }
    catch (err) {
        console.log(err);
        res.render('Workouts/list',
            {
                error: 'Error on the Server',
                WorkoutList: []
            }
        )
    }
})

// GET route for displaying the Edit Page --> Update Operation
router.get('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const workoutToEdit = await Workout.findById(id);
        
        if (!workoutToEdit) {
            return res.redirect('/workouts');
        }
        
        res.render("Workouts/edit",
            {
                title: 'Edit Workout',
                Workout: workoutToEdit
            }
        )
    }
    catch (err) {
        console.log(err);
        next(err);
    }
})

// POST route for processing the Edit Page --> Update Operation
router.post('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let updateWorkout = {
            "exerciseName": req.body.exerciseName,
            "sets": req.body.sets,
            "reps": req.body.reps,
            "weight": req.body.weight,
            "date": req.body.date,
            "notes": req.body.notes
        }
        
        await Workout.findByIdAndUpdate(id, updateWorkout);
        res.redirect("/workouts");
    }
    catch (err) {
        console.log(err);
        next(err);
    }
})

// GET route to perform Delete Operation
router.get('/delete/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        await Workout.deleteOne({ _id: id });
        res.redirect("/workouts");
    }
    catch (err) {
        console.log(err);
        next(err);
    }
})

module.exports = router;