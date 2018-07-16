let Restaurant = {
    cash: 1000000,
    seats: 2,
    staff: [],
    hire(theCook){
        alert(`hire:${theCook.name}`);
    },
    fire(theCook){
        alert(`fire:${theCook.name}`);
    }

};

let staff = {
    ID,
    Name,
    wage,
    work(){
        alert(`work!`);
    }
};

let Cook = {
    name,

}





var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});

var newCook = new Cook("Tony", 10000);
ifeRestaurant.hire(newCook);

console.log(ifeRestaurant.staff);

ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staff);