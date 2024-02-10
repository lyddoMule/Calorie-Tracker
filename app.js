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
    this._render()

}
addWorkout(workout){
    this._workouts.push(workout);
    this._totalCalorie -= workout.calories;
    this._render()
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

const tracker= new CalorieTracker()

const breakfast= new Meal( "Breakfast",  350 )
const lunch= new Meal('lunch',300)

tracker.addMeal(breakfast)
tracker.addMeal(lunch)

const run= new Workout( "run ",  550 )
tracker.addWorkout(run)

console.log(tracker._meals);
console.log(tracker._workouts);
console.log(tracker._totalCalorie);

