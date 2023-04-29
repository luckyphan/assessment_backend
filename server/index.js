const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const {getCompliment, getFortune, getGoals, createGoal, deleteGoal, updateGoal} = require('./controller')


app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get('/api/goals', getGoals)
app.post('/api/goals', createGoal)
app.delete('/api/goals/:goal_id', deleteGoal)
app.put('/api/goals/:goal_id', updateGoal)

app.listen(4000, () => console.log("Server running on 4000"));
