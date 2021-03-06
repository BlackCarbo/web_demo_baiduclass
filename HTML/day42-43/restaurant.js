let oneTime = 1000;
class Restaurant{
    constructor(name="McBonald",cash=1000,seats=1,staff=[]){
        this.name = name;
        this.cash = cash;
        this.seats = seats;
        this.staff = staff;
    }
    run(){
        
    }
    refreshCash(m){
        this.cash = Number(this.cash)+Number(m);
    }
    hire(theStf){
        alert(`hire:${theStf.name}`);
        this.staff.append(theStf);
    }
    fire(theCook){
        alert(`fire:${theCook.name}`);
    }
}

class Staff{
    constructor(p){
        this.ID = p.ID;
        this.name = p.name;
        this.wage = p.wage;
    }
    dowork(){
        console.log("work!");
    }
}
class Waiter extends Staff{
    constructor(p){
        super(p);
        this.status = 0;//服务生的状态 0：空闲，1：接收菜单，并交给厨师，2：将做好的食物给顾客，并收钱
    }
    dowork(){
        switch (this.status){
            case 0: console.log(`${this.name}处于空闲状态`);
                break;
            case 1: {
                console.log(`${this.name}接收菜单，并交给厨师`);
                timeOut(oneTime);
            }
                break;
            case 2: {
                console.log(`${this.name}将做好的食物给顾客`);
                timeOut(oneTime);
            }
                break;
            case 3: {
                console.log(`${this.name}收钱，并清理座位`);
                timeOut(oneTime);
            }
                break;
            default:console.log(`${this.name}处于其他状态`);
                break;
        }
    }
}

class Cook extends Staff{
    constructor(p){
        super(p);
        this.status = 0;//厨师的状态 0：空闲，1：接收菜单并开始做菜，2：完成菜品，并交给服务员
    }
    dowork(d="Hamburger"){
        switch (this.status){
            case 0: console.log(`${this.name}处于空闲状态`);
                break;
            case 1: {
                console.log(`${this.name}接收菜单，并开始制作---${d}`);
                timeOut(oneTime*5);
            }
                break;
            case 2:{
                console.log(`${this.name}完成菜品，并交给服务员`);
                timeOut(oneTime);
            }
                break;
            default:console.log(`${this.name}处于其他状态`);
                break;
        }
    }
}
class Customer{
    constructor(name="CC",status=0){
        this.name = name;
        this.status =status;//顾客状态，0：等待排队中，1：找到座位开始点菜，2：点完菜等待吃饭，3：得到食物开始吃饭, 4:吃完付账
    }
    doEvent(){
        switch (this.status){
            case 0: console.log(`${this.name}等待排队中`);
                break;
            case 1: {
                console.log(`${this.name}找到座位开始点菜`);
                timeOut(oneTime);
            }
                break;
            case 2: console.log(`${this.name}点完菜等待吃饭`);
                break;
            case 3:{
                console.log(`${this.name}得到食物开始吃饭`);
                timeOut(5*oneTime);
            }
                break;
            case 4: {
                console.log(`${this.name}吃完付账`);
                timeOut(oneTime);
            }
                break;
            default:console.log(`${this.name}处于其他状态`);
                break;
        }
    }

    order(){
        return parseInt(10*Math.random());
        console.log(`order,`);
    }
    eat(){
        console.log(`eat,`);
    }
}
const staff = [{
    ID: "001",
    name: "Alice",
    wage: "1000"},{
    ID: "002",
    name: "Bob",
    wage: "1000"},{
    ID: "003",
    name: "Curry",
    wage: "1300"},{
    ID: "004",
    name: "Dam",
    wage: "2000"}
];
const customer = [{name: "SoM"},
    {name: "Malcolm"},
    {name: "Joan"},
    {name: "Gary"},
    {name: "Betty"},
    {name: "Linda"},
    {name: "Whitney"},
    {name: "Michael"},
    {name: "James"},
    {name: "Charles"}];

const dishes = [{
    name: "Noodle", cost: "17", price: "20"},{
    name: "Beefsteak", cost: "25", price: "50"},{
    name: "Hamburger", cost: "10", price:"20"},{
    name: "Macaroni", cost: "13", price:"25"},{
    name: "Macarons", cost: "7", price:"15"},{
    name: "Pudding", cost: "3", price:"5"},{
    name: "Pizza", cost: "15", price:"35"},{
    name: "Colo", cost: "5", price:"10"},{
    name: "Pie", cost: "8", price:"15"},{
    name: "Tea", cost: "5", price:"10"
}];
//
// let A = new Staff(person[0]);
// A.dowork();
//
// let C = new Cook(person[3]);
// C.dowork(dishes[4].name);



function startBusiness() {
    //创建一个餐厅
    let restaurant = new Restaurant();
    //创建一个服务生
    let A = new Waiter(staff[0]);
    //创建一个厨师
    let B = new Cook(staff[1]);

    //创建一个顾客队列
    let list = [];
    for(let i=0;i<10;i++){
        let temp = new Customer(customer[i].name,0);
        list.push(temp);
    }
    console.log(list);

    //餐厅开始工作
    while(1){
        setTimeout(function(){ alert("Hello"); },2000);
        console.log(`餐厅${restaurant.name}开始营业`);
        A.dowork();
        B.dowork();
        for(let j=0;j<list.length;j++){
            let C = list[j];
            if(C){
                // 将顾客状态置为1，生成想要的食物
                C.status = 1;
                C.doEvent();
                let dish = dishes[C.order()];
                console.log(dish);

                //将服务员的状态置为1,为顾客点菜并通知厨师
                A.status = 1;
                A.dowork();

                //将顾客的状态置为2，等待上菜
                C.status = 2;
                C.doEvent();

                //将厨师的状态置为1,开始做菜
                B.status = 1;
                B.dowork(dish.name);

                //将厨师的状态置为2，将做好的才交给服务员
                B.status = 2;
                B.dowork();

                //制作菜品的花费
                restaurant.refreshCash(-dish.cost);

                //将厨师的状态置为0，处于空闲状态
                B.status = 0;
                B.dowork();

                //将服务员的状态置为2，将菜上给顾客
                A.status = 2;
                A.dowork();

                //将顾客的状态置为3，开始吃菜
                C.status = 3;
                C.doEvent();

                //将顾客的状态置为4，吃完付钱
                C.status = 4;
                C.doEvent();

                //将服务员的状态置为3，收钱并清理座位
                A.status = 3;
                A.dowork();

                //餐厅进账
                restaurant.refreshCash(dish.price);

                //将服务员的状态置为0，空闲状态等待下一个客人
                A.status = 0;
                A.dowork();

            }
            //销毁顾客
            C = null;
            console.log(`餐厅当前资金${restaurant.cash}$`);
        }
        break;
    }
}

function timeOut(t=1000) {
    setTimeout(console.log("++++"),t);
}