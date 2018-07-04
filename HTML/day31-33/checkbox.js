let sourceData = [{
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
}]
function selectListener(sw) {
    if(sw === "table-wrapper"){
        let rs = document.getElementById("region-select");
        let ps = document.getElementById("product-select");
        showNewTable(getDataBySelect(ps.value,rs.value,sourceData),sw,0,9,10);
    }else if(sw === "table-wrapper-c"){
        let t1 = 0, t2 = 0;
        let ipt = document.getElementsByTagName("input");
        let data1 = [];
        for(let i=0;i<3;i++){
            if(ipt[i+1].checked){
                t1++;
                let tempd = getDataBySelect(ipt[i+1].value,"地区全选",sourceData);
                data1.push(tempd[0]);
                data1.push(tempd[1]);
                data1.push(tempd[2]);
            }
        }
        let data2 = [];
        for(let i=0;i<3;i++){
            if(ipt[i+5].checked){
                t2++;
                let tempd = getDataBySelect("商品全选",ipt[i+5].value,sourceData);
                data2.push(tempd[0]);
                data2.push(tempd[1]);
                data2.push(tempd[2]);
            }
        }
        let data3 = [];
        for(let i=0;i<data1.length;i++){

            for(let j=0;j<data2.length;j++){
                if(data1[i].product === data2[j].product && data1[i].region === data2[j].region){
                    data3.push(data1[i]);
                }
            }
        }
        if(t1 === 1 && t2 !==1){
            showNewTable(data3,sw,1,data1.length,data2.length);
        }else if(t1 !== 1 && t2 === 1){
            showNewTable(data3,sw,2,data1.length,data2.length);
        }else{
            showNewTable(data3,sw,0,data1.length,data2.length);
        }
    }
}

function getDataBySelect(psv,rsv,data) {
    let newData = [];
    if(psv === "商品全选" && rsv === "地区全选"){
        for(let i=0;i<data.length;i++) {
            let tempData = {};
            tempData.product=data[i].product;
            tempData.region=data[i].region;
            tempData.sale=data[i].sale;
            newData.push(tempData);
        }
    }else if(psv === "商品全选" && rsv !== "地区全选"){
        for(let i=0;i<data.length;i++) {
            if(data[i].region === rsv ){
                let tempData = {};
                tempData.product=data[i].product;
                tempData.region=data[i].region;
                tempData.sale=data[i].sale;
                newData.push(tempData);

            }
        }
    }else if(psv !== "商品全选" && rsv === "地区全选"){
        for(let i=0;i<data.length;i++) {
            if(data[i].product === psv ){
                let tempData = {};
                tempData.product=data[i].product;
                tempData.region=data[i].region;
                tempData.sale=data[i].sale;
                newData.push(tempData);
            }
        }
    }else{
        for(let i=0;i<data.length;i++){
            if(data[i].product === psv && data[i].region === rsv ){
                let tempData = {};
                tempData.product=data[i].product;
                tempData.region=data[i].region;
                tempData.sale=data[i].sale;
                newData.push(tempData);
            }
        }
    }
    return newData;
}

function showNewTable(data, sw, mtype, d1l, d2l) {
    let d = document.getElementById(sw);
    let dt = document.createElement("table");
    let dtr = document.createElement("tr");

    while(d.hasChildNodes()){
        d.removeChild(d.firstChild);
    }

    let dth_p = document.createElement("th");
    let dth_r = document.createElement("th");
    dth_p.innerHTML = "商品";
    dth_r.innerHTML = "地区";
    if(mtype === 0){
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
            // dtd_p.innerHTML = data[r].product;
            // dtd_r.innerHTML = data[r].region;
            // dtr_c.appendChild(dtd_p);
            // dtr_c.appendChild(dtd_r);
            // for(let c=0;c<12;c++){
            //     let dtd = document.createElement("td");
            //     dtd.innerHTML = data[r].sale[c];
            //     dtr_c.appendChild(dtd);
            // }
            // dt.appendChild(dtr_c);
            if(d2l === 9){
                dtd_p.innerHTML = data[r].product;
                dtd_r.innerHTML = data[r].region;
                if(tt === 0){
                    dtd_p.setAttribute("rowspan","3");
                    dtr_c.appendChild(dtd_p);
                    tt = 3;
                }
                dtr_c.appendChild(dtd_r);
                for(let c=0;c<12;c++){
                    let dtd = document.createElement("td");
                    dtd.innerHTML = data[r].sale[c];
                    dtr_c.appendChild(dtd);
                }
                dt.appendChild(dtr_c);
                tt--;
            }else if(d2l === 6){
                dtd_p.innerHTML = data[r].product;
                dtd_r.innerHTML = data[r].region;
                if(tt === 0){
                    dtd_p.setAttribute("rowspan","2");
                    dtr_c.appendChild(dtd_p);
                    tt = 2;
                }
                dtr_c.appendChild(dtd_r);
                for(let c=0;c<12;c++){
                    let dtd = document.createElement("td");
                    dtd.innerHTML = data[r].sale[c];
                    dtr_c.appendChild(dtd);
                }
                dt.appendChild(dtr_c);
                tt--;
            }else{
                dtd_p.innerHTML = data[r].product;
                dtd_r.innerHTML = data[r].region;
                dtr_c.appendChild(dtd_p);
                dtr_c.appendChild(dtd_r);
                for(let c=0;c<12;c++){
                    let dtd = document.createElement("td");
                    dtd.innerHTML = data[r].sale[c];
                    dtr_c.appendChild(dtd);
                }
                dt.appendChild(dtr_c);
            }
        }
    }else if(mtype === 1){
        dtr.appendChild(dth_p);
        dtr.appendChild(dth_r);
        for(let i=0;i<12;i++){
            let dth = document.createElement("th");
            dth.innerHTML = `${i+1}月`;
            dtr.appendChild(dth);
        }
        dt.appendChild(dtr);
        for(let r=0;r<data.length;r++) {
            let dtr_c = document.createElement("tr");
            let dtd_p = document.createElement("td");
            let dtd_r = document.createElement("td");
            dtd_p.innerHTML = data[r].product;
            dtd_r.innerHTML = data[r].region;
            if(mtype){
                dtd_p.setAttribute("rowspan",d1l);
                dtr_c.appendChild(dtd_p);
                mtype--;
            }

            dtr_c.appendChild(dtd_r);
            for (let c = 0; c < 12; c++) {
                let dtd = document.createElement("td");
                dtd.innerHTML = data[r].sale[c];
                dtr_c.appendChild(dtd);
            }
            dt.appendChild(dtr_c);
        }
    }else if(mtype === 2){
        dtr.appendChild(dth_r);
        dtr.appendChild(dth_p);
        for(let i=0;i<12;i++){
            let dth = document.createElement("th");
            dth.innerHTML = `${i+1}月`;
            dtr.appendChild(dth);
        }
        dt.appendChild(dtr);
        for(let r=0;r<data.length;r++) {
            let dtr_c = document.createElement("tr");
            let dtd_p = document.createElement("td");
            let dtd_r = document.createElement("td");
            dtd_r.innerHTML = data[r].region;
            dtd_p.innerHTML = data[r].product;

            if(mtype){
                dtd_r.setAttribute("rowspan",d2l);
                dtr_c.appendChild(dtd_r);
                mtype = mtype-2;
            }
            dtr_c.appendChild(dtd_p);
            for (let c = 0; c < 12; c++) {
                let dtd = document.createElement("td");
                dtd.innerHTML = data[r].sale[c];
                dtr_c.appendChild(dtd);
            }
            dt.appendChild(dtr_c);
        }
    }
    d.appendChild(dt);
}

function changeCheckBox(cb) {
    let ipt = document.getElementsByTagName("input");
    let isAllChecked1 = ipt[1].checked && ipt[2].checked && ipt[3].checked;
    let isAllChecked2 = ipt[5].checked && ipt[6].checked && ipt[7].checked;
    // console.log(`isAllChecked1:${isAllChecked1}`);
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