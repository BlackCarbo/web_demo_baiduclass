//绘制条形图
function drowHistogram(data,isChoose=-1) {
    // 定义好柱状图绘制区域的高度，宽度，轴的高度，宽度
    let chartHeight=300, chartWidth=480, chartX=0, chartY=0, axisHeight=2, axisWidth=460;
    // 定义好每一个柱子的宽度及柱子的间隔宽度
    let rectHeight=250, rectWidth=20, rectSpace=15;
    // 定义好柱子颜色，轴的颜色
    let rectColor=["#06F","#3CC","#69C","#C33","#C69","#C96","#CC3","#0C0","#9C9"], alisColor="green";
    // 拿到柱状图中的最大值Max
    let Max=0,ratio;
    // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
    let num=data.length;
    Max = Math.max.apply(null,data[0].sale);
    for(let e=0;e<num;e++){
        let tempMax =Math.max.apply(null,data[e].sale);
        if(tempMax > Max){
            Max = tempMax;
        }
    }
    ratio = Max/rectHeight;
    let chart1 = document.getElementById("chart1");
    chart1.innerHTML="";
    //绘制被选对象文本
    for(let m=0;m<num;m++){
        let chartTitle =document.createElementNS("http://www.w3.org/2000/svg", "text");
        chartTitle.setAttributeNS(null,"x",100+(m%3)*150);
        chartTitle.setAttributeNS(null,"y",340+Math.floor(m/3)*25);
        chartTitle.setAttributeNS(null,"font-size","12");
        if(m === isChoose){
            //被选中效果
            chartTitle.setAttribute("style",`text-decoration: underline;`);
            chartTitle.setAttributeNS(null,"font-size","16");
        }
        chart1.appendChild(chartTitle);
        showText(chartTitle,`${data[m].product}-${data[m].region}`);
        let mRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        mRect.setAttribute("x", 80+(m%3)*150);
        mRect.setAttribute("y", 330+Math.floor(m/3)*25);
        mRect.setAttribute("width", 10);
        mRect.setAttribute("height", 10);
        mRect.setAttribute( "style", `fill:${rectColor[m]};stroke-width:1;stroke:rgb(0,0,0)`);
        chart1.appendChild(mRect);
    }
    // 绘制横轴及纵轴
    let axisX = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    axisX.setAttribute("x", 10);
    axisX.setAttribute("y", chartHeight-20);
    axisX.setAttribute("width", axisWidth);
    axisX.setAttribute("height", axisHeight);
    axisX.setAttribute( "style", "fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)" );
    chart1.appendChild(axisX);
    let axisY = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    axisY.setAttribute("x", 20);
    axisY.setAttribute("y", 20);
    axisY.setAttribute("width", axisHeight);
    axisY.setAttribute("height", chartHeight-20);
    axisY.setAttribute( "style", "fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)" );
    chart1.appendChild(axisY);
    for(let i=0;i<5;i++){
        let axisY_2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        axisY_2.setAttribute("x", 20);
        axisY_2.setAttribute("y", chartHeight-20 - (i+1)*50);
        axisY_2.setAttribute("width", axisWidth-10);
        axisY_2.setAttribute("height", 1);
        axisY_2.setAttribute( "style", "fill:rgb(204,204,204);stroke-width:0.5;stroke:rgb(204,204,204)" );
        chart1.appendChild(axisY_2);
        let axisY_1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        axisY_1.setAttribute("x", 20);
        axisY_1.setAttribute("y", chartHeight-20 - (i+1)*50);
        axisY_1.setAttribute("width", 4);
        axisY_1.setAttribute("height", 1);
        axisY_1.setAttribute( "style", "fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)" );
        chart1.appendChild(axisY_1);
        let coordinateY =document.createElementNS("http://www.w3.org/2000/svg", "text");
        coordinateY.setAttributeNS(null,"x",-10);
        coordinateY.setAttributeNS(null,"y",chartHeight-15 - (i+1)*50);
        coordinateY.setAttributeNS(null,"font-size","15");
        chart1.appendChild(coordinateY);
        showText(coordinateY,Math.round(50*ratio*(i+1)));
    }
    //绘制条形图
    for(let w=0;w<num;w++){
        for(let i=0;i<12;i++){
            let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", 30+(i+1)*rectSpace+i*rectWidth+w*rectWidth/num);
            rect.setAttribute("y", chartHeight-20-data[w].sale[i]/ratio);
            rect.setAttribute("width", rectWidth/num);
            rect.setAttribute("height", data[w].sale[i]/ratio);
            rect.setAttribute( "style", `fill:${rectColor[w]};stroke-width:1;stroke:rgb(0,0,0)`);
            chart1.appendChild(rect);
            let coordinateX =document.createElementNS("http://www.w3.org/2000/svg", "text");
            coordinateX.setAttributeNS(null,"x",25+(i+1)*rectSpace+i*rectWidth);
            coordinateX.setAttributeNS(null,"y",chartHeight);
            coordinateX.setAttributeNS(null,"font-size","15");
            chart1.appendChild(coordinateX);
            showText(coordinateX,`${i+1}月`);
        }
    }
}
//显示文字
function showText(obj,text) {
    obj.innerHTML=text;
}
