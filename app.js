class CalorieTracker{
    constructor(){
        this._calorieLimit= 2070;
        this._totalCalorie= 0;
        this._meals=[];
        this._workouts=[];
      
        this._displayCalorieLimit();
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();


    }

    //public methods/api 
addMeal(meal) {
    this._meals.push(meal);
    this._totalCalorie += meal.calories;
    this._displayMeal(meal)
    this._render()

}
addWorkout(workout){
    this._workouts.push(workout);
    this._totalCalorie -= workout.calories;
    this._displayWorkouts(workout)
    this._render()
}

removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);

    if (index !== -1) {
      const meal = this._meals[index];
      this._totalCalories -= meal.calories;
    //   Storage.updateTotalCalories(this._totalCalories);
      this._meals.splice(index, 1);
    //   Storage.removeMeal(id);
      this._render();
    }
  }


  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id === id);

    if (index !== -1) {
      const workout = this._workouts[index];
      this._totalCalories += workout.calories;
    //   Storage.updateTotalCalories(this._totalCalories);
      this._workouts.splice(index, 1);
    //   Storage.removeWorkout(id);
      this._render();
    }
  }

// private methods

_displayCaloriesTotal(){
    const totalCaloriesEl=document.getElementById('calories-total')
    totalCaloriesEl.innerHTML=this._totalCalorie
}

_displayCalorieLimit(){
    const calorieLimitEl= document.getElementById('dailyLimit')
    calorieLimitEl.innerHTML=this._calorieLimit
}
_displayCaloriesConsumed(){
    const caloriesConsumedEl= document.getElementById('caloriesConsumed')

    const consumed= this._meals.reduce((total, meal)=>total + meal.calories, 0)
    caloriesConsumedEl.innerHTML= consumed

}
_displayCaloriesBurned(){
    const caloriesBurnedEl= document.getElementById('caloriesBurned')

    const consumed= this._workouts.reduce((total, workout)=>total + workout.calories, 0)
    caloriesBurnedEl.innerHTML= consumed

}
_displayCaloriesRemaining(){
    const caloriesRemainingEl=document.getElementById('caloriesRemaining')
    const remaining= this._calorieLimit-this._totalCalorie
    caloriesRemainingEl.innerHTML= remaining
    const progressBarEl= document.getElementById('progressBar')

    // console.log(caloriesRemainingEl.parentElement.parentElement);
    if((this._calorieLimit-this._totalCalorie)<=0){
        
        caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light')
        caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger')
        caloriesRemainingEl.parentElement.parentElement.classList.add('text-light')
        progressBarEl.classList.remove('bg-lightLime')
        progressBarEl.classList.add('bg-danger')
     }else{
        caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light')
        caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger')
        caloriesRemainingEl.parentElement.parentElement.classList.remove('text-light')
        progressBarEl.classList.add('bg-lightLime')
        progressBarEl.classList.remove('bg-danger')
     }
 }
_displayCaloriesProgress(){
    const progressBarEl= document.getElementById('progressBar')
    const percentage= (this._totalCalorie/ this._calorieLimit)*100
    const width= Math.min(percentage,100)
    progressBarEl.style.width=`${width}%`;
    
}

_displayMeal(meal){
    const display_meal= document.getElementById('displayMeal')
    const div= document.createElement('div')
    div.classList.add('card','mt-2')
    div.setAttribute('data-id',meal.id)

    div.innerHTML=`
         <div  class="card-body p-1 ">   
            <div class="d-flex align-items-center justify-content-between">
                <h5>${meal.name}</h5>
                <button class="btn delete btn-lightLime btn-sm text-light fw-bold "> ${meal.calories}</button>
                <i class="bi bi-x bg-danger  text-light"></i>
            </div>    
        </div>`

    display_meal.appendChild(div)

}
_displayWorkouts(workout){
    const display_workout= document.getElementById('displayWorkouts')
    const div= document.createElement('div')
    div.classList.add('card','mt-2')
    div.setAttribute('data-id',workout.id)
    div.innerHTML=`
         <div  class="card-body p-1 ">   
            <div class="d-flex align-items-center justify-content-between">
                <h5>${workout.name}</h5>
                <button class="btn delete btn-orange btn-sm text-light fw-bold "> ${workout.calories}</button>
                <i class="bi bi-x bg-danger  text-light"></i>
            </div>    
        </div>`

    display_workout.appendChild(div)

}
_render(){
    this._displayCaloriesTotal() ;
    this._displayCalorieLimit();
    this._displayCaloriesConsumed()
    this._displayCaloriesBurned()
    this._displayCaloriesRemaining()
    this._displayCaloriesProgress();



}
}

class Meal{
    constructor(name, calories){
        this.id=Math.random().toString(16).slice(2)
        this.name= name;
        this.calories=calories;
    }
}
class Workout{
    constructor(name, calories){
        this.id=Math.random().toString(16).slice(2)
        this.name= name;
        this.calories=calories;
    }
}


class App{
    constructor(){
        this._tracker= new CalorieTracker()

        document.getElementById('meal-form').addEventListener('submit', this._newMeal.bind(this)) 
        document.getElementById('workout-form').addEventListener('submit', this._newWorkout.bind(this)) 
        document.getElementById('displayMeal').addEventListener('click', this._removeMeal.bind(this)) 
        document.getElementById('displayWorkouts').addEventListener('click', this._removeWorkout.bind(this)) 
    }

    _newMeal(e){
        e.preventDefault()
        // console.log(this);
        const name= document.getElementById('meal-name')
        const calories= document.getElementById('meal-calories')

        // validation

        if(name.value === ''&&calories.value===''){
            alert('Please fill in all fields')
        }
        const meal= new  Meal(name.value , +calories.value)
        this._tracker.addMeal(meal)

        name.value = '';
        calories.value = ''

        const collapseMeal= document.getElementById('mealItems')
        const bsCollapse= new bootstrap.Collapse(collapseMeal, {
            toggle: true
        })

    }
    _newWorkout(e){
        e.preventDefault()
        // console.log(this);
        const name= document.getElementById('workout-name')
        const calories= document.getElementById('workout-calories')

        // validation

        if(name.value === ''&&calories.value===''){
            alert('Please fill in all fields')
        }
        const workout= new  Workout(name.value , +calories.value)
        this._tracker.addWorkout(workout)
        name.value = '';
        calories.value = ''

        const collapseWorkout= document.getElementById('workouts')
        const bsCollapse= new bootstrap.Collapse(collapseWorkout, {
            toggle: true
        })
       }    

       _removeMeal(e){
        if(e.target.classList.contains('delete') || e.target.classList.contains('bi-x')){
           if(confirm( 'Are you sure?')){
              const id= e.target.closest('.card').getAttribute('data-id')
             this._tracker.removeMeal(id);
           const meal=  e.target.closest(`.card`).remove();
           }

        } 
    }
       _removeWorkout(e){
            if(e.target.classList.contains('delete')||e.target.classList.contains('bi-x')){
                if (confirm('Are you sure?')) {
                    const id=e.target.closest('.card').getAttribute('data-id')
                    this._tracker.removeWorkout(id)
                    const workout=e.target.closest(`.card`).remove()
                }
            }
       }
}

const app =new App()

