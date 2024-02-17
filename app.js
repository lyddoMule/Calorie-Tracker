class CalorieTracker{
    constructor(){
        this._calorieLimit= Storage.getCalorieLimit();
        this._totalCalorie= Storage.getTotalCalories(0);
        this._meals=Storage.getMeal();
        this._workouts=Storage.getWorkouts();
      
        this._displayCalorieLimit();
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();

        document.getElementById('setLimit').value = this._calorieLimit;

    }

//public methods/api 
    addMeal(meals){
        this._meals.push(meals);
        this._totalCalorie += meals.calories;
        Storage.setTotalCalories(this._totalCalorie)
        Storage.saveMeal(meals)
        this._displayMeal(meals)
        this._render()
    }

    addWorkout(workout){
        this._workouts.push(workout);
        this._totalCalorie -= workout.calories;
        Storage.setTotalCalories(this._totalCalorie)
        Storage.saveWorkouts(workout)
        this._displayWorkouts(workout)
        this._render()
    }

    removeMeal(id) {
        const index = this._meals.findIndex((meal) => meal.id === id);

        if (index !== -1) {
        const meal = this._meals[index];
        this._totalCalorie -= meal.calories;
        Storage.setTotalCalories(this._totalCalorie);
        this._meals.splice(index, 1);
        //   Storage.removeMeal(id);
        this._render();
        }
    }

    removeWorkout(id) {
        const index = this._workouts.findIndex((workout) => workout.id === id);

        if (index !== -1) {
            const workout = this._workouts[index];
            this._totalCalorie += workout.calories;
            Storage.setTotalCalories(this._totalCalorie);
            this._workouts.splice(index, 1);
        //   Storage.removeWorkout(id);
            this._render();
        }
    }

    reset(){
        if (confirm('Are you sure you want to reset?' )) {
            this._totalCalorie=0;
            this._meals=[]
            this._workouts=[]
            this._render()

        }
    }

  setLimit(limit){
    this._calorieLimit=limit
    Storage.setCalorieLimit(limit)
    this._displayCalorieLimit()
    this._render()
  }

  loadItems(){
    this._meals.forEach((meal)=>this._displayMeal(meal));
    this._workouts.forEach((workout)=>this._displayWorkouts(workout));
  }

  // private methods

_displayCaloriesTotal(){
    const totalCaloriesEl=document.getElementById('calories-total')
    totalCaloriesEl.innerHTML= this._totalCalorie
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

    const Burned= this._workouts.reduce((total, workout)=>total + workout.calories, 0)
    caloriesBurnedEl.innerHTML= Burned

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
    const display_meal= document.getElementById('meal-items')
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
    const display_workout= document.getElementById('workout-items')
    const div= document.createElement('div')
    div.classList.add('card','mt-2')
    div.setAttribute('data-id',workout.id)
    div.innerHTML=`
         <div  class="card-body p-1 ">   
            <div class="d-flex align-items-center justify-content-between">
                <h5>${workout.name}</h5>
                <button class="btn  btn-orange  btn-sm text-light fw-bold "> ${workout.calories}</button>
                <i class="bi bi-x bg-danger delete text-light"></i>
               
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

class Storage{
    static getCalorieLimit(defaultLimit=2000){
        let calorieLimit;
        if(localStorage.getItem('calorieLimit')===null){
            calorieLimit= defaultLimit;
        }else{
            calorieLimit = +localStorage.getItem('calorieLimit')
        }
        return calorieLimit
    }

    static setCalorieLimit(calorieLimit){
        localStorage.setItem('calorieLimit', calorieLimit)
    }

    static getTotalCalories(defaultCalories=0){
        let calorieTotal;
        if(localStorage.getItem('calorieTotal')===null){
            calorieTotal= defaultCalories;
        }else{
            calorieTotal = +localStorage.getItem('calorieTotal')
        }
        return calorieTotal
    }

    static setTotalCalories(totalCalories){
        localStorage.setItem('calorieTotal', totalCalories)
    }

    static getMeal() {
        let meals;
        if (localStorage.getItem('meals') === null) {
          meals = []
        }
         else {
           meals = JSON.parse(localStorage.getItem('meals'))

        }
        return meals;
      }

      static saveMeal(meal){
        let meals= Storage.getMeal();
        meals.push(meal);
       localStorage.setItem('meals', JSON.stringify(meals))
    }


    static getWorkouts(){
        let workouts;
        if(localStorage.getItem('workouts')===null){
            workouts=[]
        }else{
            workouts= JSON.parse(localStorage.getItem('workouts'))
        }
        return workouts;
    }
    static saveWorkouts(workout){
        let workouts= Storage.getWorkouts(workout)
        workouts.push(workout)
        localStorage.setItem('workouts', JSON.stringify( workouts))
    }

}
class App{
    constructor(){
        this._tracker= new CalorieTracker()

        document.getElementById('meal-form').addEventListener('submit', this._newItem.bind(this, 'meal')) 
        document.getElementById('workout-form').addEventListener('submit', this._newItem.bind(this, 'workout')) 
        document.getElementById('meal-items').addEventListener('click', this._removeItem.bind(this, 'meal')) 
        document.getElementById('workout-items').addEventListener('click', this._removeItem.bind(this, 'workout')) 
        document.getElementById('filter-meals').addEventListener('keyup', this._filterItems.bind(this, 'meal')) 
        document.getElementById('filter-workouts').addEventListener('keyup', this._filterItems.bind(this,'workout')) 
        document.getElementById('reset').addEventListener('click', this._reset.bind(this)) 
        document.getElementById('setLimitBtn').addEventListener('click', this._setLimit.bind(this)) 
        this._tracker.loadItems()
    
    }

    // _newMeal(e){
    //     e.preventDefault()
    //     const name= document.getElementById('meal-name')
    //     const calories= document.getElementById('meal-calories')

    //     // validation

    //     if(name.value === '' && calories.value===''){
    //         alert('Please fill in all fields')
    //         return;
    //     }
    //     const meal= new  Meal(name.value , +calories.value)
    //     this._tracker.addMeal(meal)

    //     name.value = '';
    //     calories.value = ''

    //     const collapseMeal= document.getElementById('collapse-meal')
    //     const bsCollapse= new bootstrap.Collapse(collapseMeal, {
    //         toggle: true
    //     })

    // }
    // _newWorkout(e){
    //     e.preventDefault()
    //     const name= document.getElementById('workout-name')
    //     const calories= document.getElementById('workout-calories')

    //     // validation

    //     if(name.value === ''&&calories.value===''){
    //         alert('Please fill in all fields')
    //     }
    //     const workout= new  Workout(name.value , +calories.value)
    //     this._tracker.addWorkout(workout)
    //     name.value = '';
    //     calories.value = ''

    //     const collapseWorkout= document.getElementById('collapse-workout')
    //     const bsCollapse= new bootstrap.Collapse(collapseWorkout, {
    //         toggle: true
    //     })
    //    }    


    _newItem(type, e) {
        e.preventDefault();
    
        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);
    
        // Validate inputs
        if (name.value === '' || calories.value === '') {
          alert('Please fill in all fields');
          return;
        }
    
        if (type === 'meal') {
          const meal = new Meal(name.value, +calories.value);
          this._tracker.addMeal(meal);
        } else {
          const workout = new Workout(name.value, +calories.value);
          this._tracker.addWorkout(workout);
        }
    
        name.value = '';
        calories.value = '';
    
        const collapseItem = document.getElementById(`collapse-${type}`);
        const bsCollapse = new bootstrap.Collapse(collapseItem, {
          toggle: true,
        });
      }
  
    //    _removeMeal(e){
    //     if(e.target.classList.contains('delete') || e.target.classList.contains('bi-x')){
    //        if(confirm( 'Are you sure?')){
    //           const id= e.target.closest('.card').getAttribute('data-id')
    //          this._tracker.removeMeal(id);
    //        const meal=  e.target.closest(`.card`).remove();
    //        }

    //     } 
    // }
    //    _removeWorkout(e){
    //         if(e.target.classList.contains('delete')||e.target.classList.contains('bi-x')){
    //             if (confirm('Are you sure?')) {
    //                 const id=e.target.closest('.card').getAttribute('data-id')
    //                 this._tracker.removeWorkout(id)
    //                 const workout=e.target.closest(`.card`).remove()
    //             }
    //         }
    //    }



  
    //    _filterMeals(e){
    //     const text= e.target.value.toLowerCase()
    //     document.querySelectorAll(`#meal-items .card`).forEach(item=>{
    //         const name= item.firstElementChild.firstElementChild.textContent
           
    //         if (name.toLowerCase().indexOf(text)!== -1 ) {
    //             item.style.display='block'
    //         }else{
    //             item.style.display='none'
    //         }
    //     })
    //    }

    //     _filterWorkouts(e){
    //         const text= e.target.value.toLowerCase();
    //         document.querySelectorAll('#workout-items .card').forEach(item=>{
    //             const name= item.firstElementChild.firstElementChild.textContent;
    //             if(name.toLowerCase().indexOf(text)!==-1){
    //                 item.style.display='block'
    //             }else{
    //                 item.style.display='none'
    //             }
    //         })
    //     }

    _removeItem(type, e) {
        if (
          e.target.classList.contains('delete') ||
          e.target.classList.contains('bi-x')
        ) {
          if (confirm('Are you sure?')) {
            const id = e.target.closest('.card').getAttribute('data-id');
    
            type === 'meal'
              ? this._tracker.removeMeal(id)
              : this._tracker.removeWorkout(id);
    
            e.target.closest('.card').remove();
          }
        }
      }
  

    _filterItems(type, e) {
        const text = e.target.value.toLowerCase();
        document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
          const name = item.firstElementChild.firstElementChild.textContent;
    
          if (name.toLowerCase().indexOf(text) !== -1) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      }
  
        _reset(){
            this._tracker.reset();
            document.getElementById('meal-items').innerHTML=''
            document.getElementById('workout-items').innerHTML=''
            document.getElementById('filter-workouts').value=''
            document.getElementById('filter-meals').value=''
        }
        _setLimit(){
            const limit= document.getElementById('setLimit')
            if (limit.value===''||limit.value===null) {
                alert('Please add a limit')
                
            } else{
                    this._tracker.setLimit(+limit.value)
                } 
                
            limit.value=''
        }
}
const app =new App()




