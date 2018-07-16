let mroot = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}];
let tempDat = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}];

let sourceData;
let lineMax = 700;//最大值
let mouseOverTime = 1;//鼠标悬停触发事件
let isOnBt = 0;//鼠标是否在按钮上
let inputIsFocused = 0;//是否正在输入值
let tempNum;//临时存放被修改前数值
// let tempDat;//临时存放被修改前数据
let select3;

window.onload = function () {
    if(localStorage.getItem("originalData")){
        sourceData = localStorage.getItem("originalData");
        sourceData = JSON.parse(sourceData); //转为JSON
        // console.log(sourceData); // 打印出原先对象
    }else{
        sourceData = tempDat;
    }
};

window.onkeydown = function () {
    if(event.keyCode === 27){
        quxiao();
    }
    if(event.keyCode === 13){
        queding();
    }
}

function selectListener(sw="table-wrapper-c",isChoose=-1) {
    if(sw === "table-wrapper-c"){
        //表二事件
        let t1 = 0, t2 = 0;
        let ipt = document.getElementsByClassName("chose");
        let select1 = [0,0,0,0,0,0,0,0,0];
        for(let i=0;i<3;i++){
            if(ipt[i+1].checked){
                t1++;
                let selectTemp = getDataBySelect(ipt[i+1].value,"地区全选",sourceData);
                select1 = select1.map((v,i) => selectTemp[i]+v);
            }
        }
        let select2 = [0,0,0,0,0,0,0,0,0];
        for(let i=0;i<3;i++){
            if(ipt[i+5].checked){
                t2++;
                let selectTemp = getDataBySelect("商品全选",ipt[i+5].value,sourceData);
                select2 = select2.map((v,i) => selectTemp[i]+v);
            }
        }

        select3 = select1.map((v,i) => select2[i] && v);
        if(select3){
            showNewTable(sourceData,sw,select3);
            drowLineChart(sourceData,select3,isChoose-1);
            drowHistogram(sourceData, select3, isChoose-1);
        }
    }
}

//返回筛选的数据
function getDataBySelect(psv,rsv,data) {
    let newSelect = [0,0,0,0,0,0,0,0,0];
    if(psv === "商品全选" && rsv === "地区全选"){
        for(let i=0;i<data.length;i++) {
            newSelect[i] = 1
        }
    }else if(psv === "商品全选" && rsv !== "地区全选"){
        for(let i=0;i<data.length;i++) {
            if(data[i].region === rsv ){
                newSelect[i] = 1;
            }
        }
    }else if(psv !== "商品全选" && rsv === "地区全选"){
        for(let i=0;i<data.length;i++) {
            if(data[i].product === psv ){
                newSelect[i] = 1;
            }
        }
    }else{
        for(let i=0;i<data.length;i++){
            if(data[i].product === psv && data[i].region === rsv ){
                newSelect[i] = 1;
            }
        }
    }
    return newSelect;
}

//绘制表格
function showNewTable(data, sw, select) {
    let d = document.getElementById(sw);
    let dt = document.createElement("table");
    dt.setAttribute("border","1");
    if(sw === "table-wrapper"){
        dt.setAttribute("id","table_1");
    }else if(sw === "table-wrapper-c"){
        dt.setAttribute("id","table_2");
    }
    let dtr = document.createElement("tr");
    while(d.hasChildNodes()){
        //每次清空
        d.removeChild(d.firstChild);
    }
    let dth_p = document.createElement("th");
    let dth_r = document.createElement("th");
    dth_p.innerHTML = "商品";
    dth_r.innerHTML = "地区";
    if(1){
        dtr.appendChild(dth_p);
        dtr.appendChild(dth_r);
        for(let i=0;i<12;i++){
            let dth = document.createElement("th");
            dth.innerHTML = `${i+1}月`;
            dtr.appendChild(dth);
        }
        dt.appendChild(dtr);
        let tt = 0;
        for(let r=0;r<data.length;r++){
            let dtr_c = document.createElement("tr");
            let dtd_p = document.createElement("td");
            let dtd_r = document.createElement("td");
            // dtr_c.setAttribute("onmouseover","mouseOverTable(this)");
            // dtr_c.setAttribute("onmouseleave","mouseLeaveTable(this)");
            if(1){
                dtd_p.innerHTML = data[r].product;
                dtd_r.innerHTML = data[r].region;
                // if(tt === 0){
                //     dtd_p.setAttribute("rowspan","3");
                //     dtr_c.appendChild(dtd_p);
                //     tt = 3;
                // }
                dtr_c.appendChild(dtd_p);
                dtr_c.appendChild(dtd_r);
                for(let c=0;c<12;c++){
                    let dtd = document.createElement("td");
                    let dti = document.createElement("input");
                    dti.setAttribute("class","dti");
                    dti.setAttribute("size","6");
                    dti.setAttribute("value",`${data[r].sale[c]}`);
                    dti.setAttribute("onfocus","inputBeFocused1(this)");
                    dti.setAttribute("onblur",`inputBeFocused2(this)`);
                    dti.setAttribute("onmouseover","mouseOverTable(this)");
                    dti.setAttribute("onmouseleave","mouseLeaveTable(this)");
                    dti.style.background = "rgba(0, 0, 0, 0)";
                    // dti.value = data[r].sale[c];
                    dtd.appendChild(dti);
                    dtr_c.appendChild(dtd);
                }
                if(select[r] === 1){
                    dt.appendChild(dtr_c);
                }
                tt--;
            }
        }
    }
    d.appendChild(dt);
}

//CheckBox选择逻辑
function changeCheckBox(cb) {
    let ipt = document.getElementsByClassName("chose");
    let isAllChecked1 = ipt[1].checked && ipt[2].checked && ipt[3].checked;
    let isAllChecked2 = ipt[5].checked && ipt[6].checked && ipt[7].checked;
    switch (cb.value) {
        case "商品全选": if(ipt[0].checked){
            ipt[1].checked = true;
            ipt[2].checked = true;
            ipt[3].checked = true;
        }else{
            ipt[1].checked = false;
            ipt[2].checked = false;
            ipt[3].checked = false;
        }
            break;
        case "手机":
        case "笔记本":
        case "智能音箱": if(isAllChecked1){
            ipt[0].checked = true;
        }else{
            ipt[0].checked = false;
        }
            break;
        case "地区全选": if(ipt[4].checked){
            ipt[5].checked = true;
            ipt[6].checked = true;
            ipt[7].checked = true;
        }else{
            ipt[5].checked = false;
            ipt[6].checked = false;
            ipt[7].checked = false;
        }
            break;
        case "华东":
        case "华南":
        case "华北": if(isAllChecked2){
            ipt[4].checked = true;
        }else{
            ipt[4].checked = false;
        }
            break;
        default:
            break;
    }
}

//鼠标悬停事件
function mouseOverTable(thisTr) {
    // console.log(thisTr);
    if(mouseOverTime === 1){
        let t = 0;
        if(1){
            let thisTable = document.getElementById("table_2");
            // console.log(thisTable.rows.length);
            for(;t<thisTable.rows.length;t++){
                if(thisTr.parentNode.parentNode === thisTable.rows[t]){
                    break;
                }
            }
            let x = thisTr.getBoundingClientRect().left+25+document.documentElement.scrollLeft;
            let y = thisTr.getBoundingClientRect().top+document.documentElement.scrollTop;
            showTips(x,y);
        }
        selectListener("table-wrapper-c",t);
        mouseOverTime = 0;
    }
}

//鼠标离开事件
function mouseLeaveTable(thisTr){
    freshData();
    if(!inputIsFocused){
        selectListener("table-wrapper-c");
        mouseOverTime = 1;
        let tip = document.getElementById("tips");
        tip.innerHTML = '';
    }
}

//input框被选中事件
function inputBeFocused1(thisIpt) {
    document.getElementById("isbt").innerHTML="";
    if (inputIsFocused) {
        inputIsFocused = 0;
        // console.log("未获取焦点")
    }else{
        inputIsFocused = 1;
        // console.log("获取焦点")
        tempNum = thisIpt.value;
        let tip = document.getElementById("tips");
        tip.innerHTML="";
        let x = thisIpt.getBoundingClientRect().left+25+document.documentElement.scrollLeft;
        let y = thisIpt.getBoundingClientRect().top+document.documentElement.scrollTop;
        showTips(x,y);
        shoeButton(x,y+25);
    }
}

function inputBeFocused2(thisIpt) {
    if (!inputIsFocused) {
        inputIsFocused = 1;
        // console.log("未离开焦点");
    }else{
        inputIsFocused = 0;
        // console.log("离开焦点")
        if(isNaN(Number(thisIpt.value))){
            alert("请输入正确的数字");
            thisIpt.value = tempNum;
        }
        document.getElementById("tips").innerHTML="";
        // document.getElementById("isbt").innerHTML="";
    }
}

//清空localStorage
function clearLS() {
    if(localStorage.getItem("originalData")){
        localStorage.clear();
        alert("完成清除");
    }else{
        alert("无相关localStorage");
    }
}

//将数据保存到本地
function saveData() {
    let originalData = JSON.stringify(sourceData);
    localStorage.setItem("originalData",originalData);
}

//刷新当前数据
function freshData() {
    let t = 0;
    let newSelect = select3;
    let thisTable = document.getElementById("table_2");
    for(let i=0;i<sourceData.length;i++){
        if(newSelect[i]){
            for(let j=0;j<12;j++){
                let temp = thisTable.rows[t+1].children[j+2];
                sourceData[i].sale[j]= temp.children[0].value;
            }
        t++;
        }
    }
}

//显示鼠标悬浮提示
function showTips(x,y) {
    let tip = document.getElementById("tips");
    let tex = document.createElement("p");
    // tex.setAttribute("innerHTML","编辑");
    tex.innerHTML = "编辑";
    tex.style.fontSize = "1px";
    tex.style.margin = "0";
    tex.style.padding = "0";
    tex.style.color = "#999";
    tip.appendChild(tex);
    tip.style.position = "absolute";
    tip.style.margin = "0";
    tip.style.padding = "0";
    tip.style.left = `${x}px`;
    tip.style.top = `${y}px`;
    tip.style.zIndex = "-1";
}

//显示是否确定按钮
function shoeButton(x,y) {
    let isbt = document.getElementById("isbt");
    let bt1 = document.createElement("input");
    bt1.type = "button";
    bt1.value = "确定";
    bt1.setAttribute("onclick",`queding()`);
    let bt2 = document.createElement("input");
    bt2.type = "button";
    bt2.value = "取消";
    bt2.setAttribute("onclick",`quxiao()`);
    bt2.setAttribute("onmouseover","isOnButton(this)");
    bt2.setAttribute("onmouseleave","isOnButton(this)");
    isbt.appendChild(bt1);
    isbt.appendChild(bt2);
    isbt.style.position = "absolute";
    isbt.style.margin = "0";
    isbt.style.padding = "0";
    isbt.style.left = `${x}px`;
    isbt.style.top = `${y}px`;
    isbt.style.zIndex = "9";
}

//确定修改值
function queding() {
    selectListener();
    document.getElementById("isbt").innerHTML="";
    // document.getElementById("tip").innerHTML="";
    console.log(sourceData);
    console.log(mroot);
}

//取消修改值
function quxiao() {
    console.log(sourceData);
    console.log(mroot);
    console.log("取消");
    for(let i=0;i<sourceData.length;i++){
        for(let j=0;j<12;j++){
            let temp = mroot[i].sale[j];
            sourceData[i].sale[j] = temp;
        }
    }
    selectListener();
    console.log(sourceData);
    console.log(mroot);
    document.getElementById("isbt").innerHTML="";
    // document.getElementById("tip").innerHTML="";
}

//判断鼠标是否在按钮上
function isOnButton(a) {
    if(isOnBt){
        isOnBt=0;
    }else{
        isOnBt=1;
    }
}
