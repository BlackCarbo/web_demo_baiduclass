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
    addCash(m){
        this.cash = Number(this.cash)+Number(m);
    }
    subCash(m){
        this.cash = Number(this.cash)-Number(m);
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
            }
                break;
            case 2: {
                console.log(`${this.name}将做好的食物给顾客`);
            }
                break;
            case 3: {
                console.log(`${this.name}收钱，并清理座位`);
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
    dowork(d){
        switch (this.status){
            case 0: console.log(`${this.name}处于空闲状态`);
                break;
            case 1: {
                for(let i=0;i<d.length;i++){
                    console.log(`${this.name}接收菜单，并开始制作---${dishes[d[i]].name}`);
                }
            }
                break;
            case 2:{
                console.log(`${this.name}完成菜品，并交给服务员`);
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
        this.imgsrc = "Customer1.png";
        this.status = status;//顾客状态，0：等待排队中，1：找到座位开始点菜，2：点完菜等待吃饭，3：得到食物开始吃饭, 4:吃完付账
        this.wantToEat = [];
        this.numbOfFoods = parseInt(10*Math.random()+1);
    }
    doEvent(){
        switch (this.status){
            case 0: console.log(`${this.name}空闲状态`);
                break;
            case 1: {
                console.log(`${this.name}找到座位开始点菜`);
            }
                break;
            case 2: console.log(`${this.name}点完菜等待吃饭`);
                break;
            case 3:{
                console.log(`${this.name}得到食物开始吃饭`);
            }
                break;
            case 4: {
                console.log(`${this.name}吃完付账`);
            }
                break;
            case 5: {
                console.log(`${this.name}付账离开`);
            }
                break;
            default:console.log(`${this.name}处于其他状态`);
                break;
        }
    }

    order(){
        for(let i=0;i<this.numbOfFoods;i++){
            let temp = parseInt(10*Math.random());
            this.wantToEat.push(temp);
        }
        return this.wantToEat;
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
    name: "Noodle", cost: "17", price: "20", needTime: 3*oneTime},{
    name: "Beefsteak", cost: "25", price: "50", needTime: 6*oneTime},{
    name: "Hamburger", cost: "10", price:"20", needTime: 2*oneTime},{
    name: "Macaroni", cost: "13", price:"25", needTime: 3*oneTime},{
    name: "Macarons", cost: "7", price:"15", needTime: 4*oneTime},{
    name: "Pudding", cost: "3", price:"5", needTime: 3*oneTime},{
    name: "Pizza", cost: "15", price:"35", needTime: 5*oneTime},{
    name: "Colo", cost: "5", price:"10", needTime: 1*oneTime},{
    name: "Pie", cost: "8", price:"15", needTime: 4*oneTime},{
    name: "Tea", cost: "5", price:"10", needTime: 1*oneTime}];
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
    for(let i=0;i<1;i++){
        let temp = new Customer(customer[i].name,0);
        list.push(temp);
    }
    console.log(list);

    //餐厅开始工作
    while(1){
        console.log(`餐厅${restaurant.name}开始营业`);
        A.dowork();
        B.dowork();
        for(let j=0;j<list.length;j++){
            console.log("++++++++++");
            console.log(`餐厅当前资金${restaurant.cash}$`);
            let C = list[j];
            if(C){
                console.log(`招待第${j+1}个客人`);
                setTimeout(refreshStatus(A,B,C,restaurant),oneTime);
                showAll(A,B,C,restaurant);
                console.log("++++++++++");
                setTimeout(refreshStatus(A,B,C,restaurant),oneTime);
                console.log("++++++++++");
                setTimeout(refreshStatus(A,B,C,restaurant),oneTime);
                console.log("++++++++++");
                setTimeout(refreshStatus(A,B,C,restaurant),oneTime);
                console.log(`第${j+1}个客人离开`);
                console.log("++++++++++");
                setTimeout(refreshStatus(A,B,C,restaurant),oneTime);
            }
            //销毁顾客
            C = null;
            // console.log(`餐厅当前资金${restaurant.cash}$`);
        }
        break;
    }
}

function timeOut(t=1000) {
    setTimeout(console.log("++++"),t);
}

function refreshStatus(A,B,C,restaurant) {
    if(A.status===0 && B.status===0 && C.status===0){
        // alert("状态0");
        //若服务员厨师顾客的状态都为空闲，则服务员和顾客的状态置为1，即开始点菜，厨师等待做菜。
        A.status = 1;
        B.status = 0;
        C.status = 1;
        C.doEvent();
        A.dowork();
        B.dowork();
        return 0;
    }
    else if(A.status===1 && B.status===0 && C.status===1){
        // alert("状态1");
        //若服务员的状态为1，厨师的状态为0，顾客的状态为1，
        // 则将服务员的状态置为0，厨师的状态置为1，顾客的状态置为2，即服务员将菜单给厨师，厨师开始做菜。
        C.order();
        A.status = 0;
        B.status = 1;
        C.status = 2;
        C.doEvent();
        A.dowork();
        B.dowork(C.wantToEat);
        return 0;
    }
    else if(A.status===0 && B.status===1 && C.status===2){
        // alert("状态2");
        //若服务员的状态为0，厨师的状态为1，顾客的状态为2，
        // 则将服务员的状态置为2，厨师的状态置为2，顾客的状态置为3，即服务员将厨师做好的彩交给顾客。
        A.status = 2;
        B.status = 2;
        C.status = 3;
        B.dowork();
        A.dowork();
        C.doEvent();
        for(let i=0;i<C.wantToEat.length;i++){
            restaurant.subCash(dishes[C.wantToEat[i]].cost);
        }

        console.log(`餐厅当前资金${restaurant.cash}$`);
        return 0;
    }
    else if(A.status===2 && B.status===2 && C.status===3){
        // alert("状态3");
        //若服务员的状态为2，厨师的状态为2，顾客的状态为3，
        // 则将服务员的状态置为3，厨师的状态置为0，顾客的状态置为4，即顾客吃完饭付钱，服务员收钱整理座位。
        C.status = 4;
        A.status = 3;
        B.status = 0;
        A.dowork();
        B.dowork();
        C.doEvent();
        for(let i=0;i<C.wantToEat.length;i++){
            restaurant.addCash(dishes[C.wantToEat[i]].price);
        }
        console.log(`餐厅当前资金${restaurant.cash}$`);
        return 0;
    }else {
        //若出现此外的其他情况，将状态归0；
        A.status = 0;
        B.status = 0;
        C.status = 5;
        A.dowork();
        B.dowork();
        C.doEvent();
        return 0;
    }
}

// window.onload = showAll();
function showAll(A,B,C,restaurant) {
    let showCustomer = document.getElementById("customer");
    showCustomer.children[0].children[0].innerHTML = C.name;
    showCustomer.children[1].children[0].src = C.imgsrc;
    showCustomer.children[2].children[0].innerHTML = `status:${C.status}`;
    // let temp = document.createElement("input");
    // showCustomer.appendChild(temp);
    let diancan = showCustomer.children[3];
    console.log(C.wantToEat);
    for(let i=0;i<C.numbOfFoods;i++){
        console.log("11");
        let tempP = document.createElement("p");
        tempP.innerHTML = `点了---${dishes[C.wantToEat[i]]}`;
        diancan.appendChild(tempP);
    }
    console.log(showCustomer);

}