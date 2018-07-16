let tempData = [{
    product: "XX",
    region: "华X",
    sale: []
},{}];
//绘制折线图
function drowLineChart(data = tempData, newSelect, isChoose = -1) {
    // 定义好折线图绘制区域的高度，宽度，轴的高度，宽度
    let chartHeight=300, chartWidth=480, chartX=0, chartY=0, axisHeight=2, axisWidth=460;
    // 定义好每一个数据点的直径，颜色，线的颜色，宽度
    let diameter=2, lineWidth=2, pointColor=["#06F","#3CC","#69C","#C33","#C69","#C96","#CC3","#0C0","#9C9"],lineColor="blue";
    // 定义好没两个数据点之间的横向间隔距离
    let pointSpace=35;
    // 拿到折线图中的最大值Max
    ratio = lineMax/(chartHeight-50);
    let chart2 = document.getElementById("chart2");
    chart2.height = chart2.height;
    let N = 0,T=0;
    let M = 0;//记录有多少组数据
    for(let m=0;m<newSelect.length;m++){
        M += newSelect[m];
    }
    // 绘制横轴及纵轴
    let ct=chart2.getContext("2d");
    ct.fillStyle = "#000000";
    ct.fillRect(10,chartHeight-20,axisWidth,axisHeight);
    ct.fillRect(20,20,axisHeight,chartHeight-20);
    ct.font="12px Arial";
    let ctb = chart2.getContext("2d");
    //绘制被选对象文本
    for(let h=0;h<data.length;h++){
        if(newSelect[h]){
            if(T===isChoose){
                //被选中效果
                ct.font="16px Arial";
            }else{
                ct.font="12px Arial";
            }
            ct.fillStyle = "#000000";
            ct.fillText(`${data[h].product}-${data[h].region}`,100+(T%3)*150,330+Math.floor(T/3)*25);
            ctb.fillStyle = pointColor[T];
            ctb.fillRect(80+(T%3)*150,320+Math.floor(T/3)*25,10,10)
            T++;
        }
    }
    for(let k=0;k<12;k++){
        let ctx=chart2.getContext("2d");
        ctx.fillStyle = "#000000";
        ctx.font="15px Arial";
        ctx.fillText(`${k+1}月`,15+(k+1)*pointSpace,chartHeight);
    }
    for(let j=0;j<7;j++){
        let cty = chart2.getContext("2d");
        cty.fillStyle = "#CCCCCC";
        cty.fillRect(20,chartHeight-20-(j+1)*100/ratio,axisWidth-10,1);
        cty.fillStyle = "#000000";
        cty.fillRect(20,chartHeight-20-(j+1)*100/ratio,4,2);
        cty.font="12px Arial";
        cty.fillText(Math.round(100*(j+1)),0,chartHeight-15-(j+1)*100/ratio);
    }
    //绘制折线
    for(let l=0;l<data.length;l++){
        if(newSelect[l]){
            for(let i=0;i<12;i++){
                let ctp=chart2.getContext("2d");
                ctp.fillStyle = pointColor[N];
                ctp.strokeStyle  = pointColor[N];
                ctp.beginPath();
                if(isChoose === N){
                    ctp.lineWidth = lineWidth+1;
                    ctp.arc(20+(i+1)*pointSpace, chartHeight-20-data[l].sale[i]/ratio,diameter+1,0,2*Math.PI);
                }else{
                    ctp.lineWidth = lineWidth;
                    ctp.arc(20+(i+1)*pointSpace, chartHeight-20-data[l].sale[i]/ratio,diameter,0,2*Math.PI);
                }
                ctp.fill();
                ctp.stroke();
                ctp.closePath();
                if(i){
                    ctp.moveTo(20+(i)*pointSpace,chartHeight-20-data[l].sale[i-1]/ratio);
                    ctp.lineTo(20+(i+1)*pointSpace,chartHeight-20-data[l].sale[i]/ratio);
                    ctp.stroke();
                }
            }
            N++;
        }
    }
}
