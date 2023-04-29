const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneCookie")
const goalsContainer = document.querySelector('#goals-container')
const form = document.querySelector('form')

const baseURL = "http://localhost:4000/api"

const goalsCallback = ({ data: goals }) => displayGoals(goals)
const errCallback = err => console.log(err)


const getAllGoals = () => axios.get(`${baseURL}/goals/`).then(goalsCallback).catch(errCallback)
const createGoal = body => axios.post(`${baseURL}/goals/`, body).then(goalsCallback).catch(errCallback)
const deleteGoal = id => axios.delete(`${baseURL}/goals/${id}`).then(goalsCallback).catch(errCallback)
const updateGoal = (id, type) => axios.put(`${baseURL}/goals/${id}`, {type}).then(goalsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let objective = document.querySelector('#objective')
    let days = document.querySelector('#days')

    let bodyObj = {
        objective: objective.value,
        days: days.value
    }

    createGoal(bodyObj)

    //next time create new goal ensures the values are clear of old

    objective.value = ''
    days.value = ''
}


function createGoalCard(goal) {
    const goalCard = document.createElement('div')
    goalCard.classList.add('goal-card')

    goalCard.innerHTML = 
    `
    <p class="objective">${goal.objective}</p>
    <div class="btns-container">
        <button onclick="updateGoal(${goal.id}, 'minus')">-</button>
        <p class="goal-days">${goal.days} days</p>
        <button onclick="updateGoal(${goal.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteGoal(${goal.id})">delete</button>
    `


    goalsContainer.appendChild(goalCard)
}



function displayGoals(arr) {
    goalsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createGoalCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllGoals()


const getCompliment = () => {
    axios.get(`${baseURL}/compliment/`)
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment);

const getFortune = () => {
    axios.get(`${baseURL}/fortune/`)
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

fortuneBtn.addEventListener('click', getFortune)