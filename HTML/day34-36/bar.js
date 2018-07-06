function drowHistogram(data) {
    // 定义好柱状图绘制区域的高度，宽度，轴的高度，宽度
    let chartHeight=300, chartWidth=480, chartX=0, chartY=0, axisHeight=2, axisWidth=460;
    // 定义好每一个柱子的宽度及柱子的间隔宽度
    let rectHeight=250, rectWidth=20, rectSpace=15;
    // 定义好柱子颜色，轴的颜色
    let rectColor="blue", alisColor="green";
    // 拿到柱状图中的最大值Max
    let Max,ratio;
    // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
    Max = Math.max.apply(null,data.sale);
    // console.log(Max);
    ratio = Max/rectHeight;
    let chart1 = document.getElementById("chart1");
    chart1.innerHTML="";

    let chartTitle =document.createElementNS("http://www.w3.org/2000/svg", "text");
    chartTitle.setAttributeNS(null,"x",100);
    chartTitle.setAttributeNS(null,"y",350);
    chartTitle.setAttributeNS(null,"font-size","20");
    chart1.appendChild(chartTitle);
    showText(chartTitle,`商品：${data.product}-----地区：${data.region}`);
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



    for(let i=0;i<12;i++){
        let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", 30+(i+1)*rectSpace+i*rectWidth);
        rect.setAttribute("y", chartHeight-20-data.sale[i]/ratio);
        rect.setAttribute("width", rectWidth);
        rect.setAttribute("height", data.sale[i]/ratio);
        rect.setAttribute( "style", "fill:rgb(255,255,255);stroke-width:1;stroke:rgb(0,0,0)" );
        chart1.appendChild(rect);
        let coordinateX =document.createElementNS("http://www.w3.org/2000/svg", "text");
        coordinateX.setAttributeNS(null,"x",25+(i+1)*rectSpace+i*rectWidth);
        coordinateX.setAttributeNS(null,"y",chartHeight);
        coordinateX.setAttributeNS(null,"font-size","15");
        chart1.appendChild(coordinateX);
        showText(coordinateX,`${i+1}月`);
    }
}
// drowHistogram(sourceData[0]);
function showText(obj,text) {
    obj.innerHTML=text;
}
function drowLineChart(data) {
    // 定义好折线图绘制区域的高度，宽度，轴的高度，宽度
    let chartHeight=300, chartWidth=480, chartX=0, chartY=0, axisHeight=2, axisWidth=460;
    // 定义好每一个数据点的直径，颜色，线的颜色，宽度
    let diameter=2,pointColor="#000000",lineColor="blue",lineWidth=1;
    // 定义好没两个数据点之间的横向间隔距离
    let pointSpace=35;
    // 拿到折线图中的最大值Max
    let Max;
    // 根据Max和你用来绘制折线图图像区域的高度，进行一个数据和像素的折算比例
    Max = Math.max.apply(null,data.sale);
    console.log(Max);
    ratio = Max/(chartHeight-20);

    let c = document.getElementById("chart2");
    // 绘制横轴及纵轴
    let ctx=c.getContext("2d");
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(10,chartHeight-20,axisWidth,axisHeight);
    ctx.fillRect(20,20,axisHeight,chartHeight-20);
    ctx.font="20px Arial"
    ctx.fillText(`商品：${data.product}-----地区：${data.region}`,50,30);
    for(let i=0;i<12;i++){
        let ctp=c.getContext("2d");
        ctp.fillStyle = pointColor;
        ctp.arc(20+(i+1)*pointSpace, chartHeight+10-data.sale[i]/ratio,diameter,0,2*Math.PI);
        ctp.stroke()
        ctp.font="15px Arial"
        ctp.fillText(`${i+1}月`,20+(i+1)*pointSpace,chartHeight);
    }
}
drowLineChart(sourceData[0]);