const db = require('./db.json')
let id = db.length

module.exports = {
    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        const fortunes = ["Expect much of yourself and little of others.", 
        "I learn by going where I have to go.", 
        "Like the river flow into the sea. Something are just meant to be.",
        "Self-knowledge is a life long process.",
        "Welcome change."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
    },
    getGoals : (req,res) => {
        let allGoals = db;
        res.status(200).send(allGoals);
    },
    createGoal: (req,res) => {
        id++;
        //spread operator to destructure
        let newGoal = {...req.body, id : id};
        db.push(newGoal);
        res.status(200).send(db);
    },
    deleteGoal: (req,res) => {
        //let goal_id be placeholder for the params value
        const {goal_id} = req.params;
        for (let i = 0; i < db.length; i++) {
            if (db[i].id === Number(goal_id)) {
                db.splice(i, 1)
            }
        }
        res.status(200).send(db)    
    },
    updateGoal: (req,res) => {
        const {goal_id} = req.params;
        const {type} = req.body;
        for (let i = 0; i < db.length; i++) {
            if (db[i].id === Number(goal_id)) {
                if(type === 'plus'){
                    db[i].days++;
                    // console.log('plus')
                }
                if(type === 'minus' && db[i].days > 0){
                    db[i].days--;
                    // console.log('minus')
                }
            }
        }
        res.status(200).send(db)  
    }
}