export default function drawRegion(speed){
	const ctx = this.ctx,
		  regionVal = this.regionVal;
    ctx.strokeStyle = '#925d3b';
    //单位半径
    let r = regionVal.radius / regionVal.lineCount;
    let data = [];
    //绘制多边形层数
    for(let i = 0; i < regionVal.lineCount; i ++){
        ctx.beginPath();
        //当前半径    
        let currR = r * ( i + 1);
        //绘制正边多边形
        for(let j = 0; j < regionVal.lineCount; j ++){
        	let param = {};
            param.x = regionVal.x + currR * Math.cos(regionVal.angle * j)*speed;
            param.y = regionVal.y + currR * Math.sin(regionVal.angle * j)*speed;
            ctx.lineTo(param.x, param.y);
            if(i == regionVal.lineCount-1){
            	let textRender = regionVal.data[j].name;
            	data.push(param);
            	ctx.fillStyle = '#fff';
            	ctx.font = "20px Microsoft YaHei";
            	let text_width = ctx.measureText(textRender).width; //获取当前绘画的字体宽度
            	//分布字体计算  根据不同象限来计算
		        if( regionVal.angle * j >= 0 && regionVal.angle * j <= Math.PI / 2 ){
		            ctx.fillText(textRender, param.x, param.y); 
		        }else if(regionVal.angle * j > Math.PI / 2 && regionVal.angle * j <= Math.PI * 3 / 2){
		            ctx.fillText(textRender, param.x - text_width, param.y);    
		        }else{
		            ctx.fillText(textRender, param.x, param.y);
		        }
            }
        }
        ctx.closePath()
        ctx.stroke();
    }

    //绘制对角线
    ctx.beginPath();
    for(let j = 0;j<regionVal.lineCount/2;j++){
    	ctx.strokeStyle = '#d3bf97';
    	ctx.moveTo(data[j].x, data[j].y);
        ctx.lineTo(data[j + 3].x, data[j + 3].y);
    }
    ctx.closePath();
    ctx.stroke();
    setTimeout(()=>{
        //绘制覆盖区域
        ctx.beginPath();
        for(let j = 0; j < regionVal.lineCount; j ++){
            let dataRender = regionVal.data[j].value/100*Math.pow(speed,9);
            let start = regionVal.x + regionVal.radius * Math.cos(regionVal.angle * j)*dataRender;
            let end = regionVal.y + regionVal.radius * Math.sin(regionVal.angle * j)*dataRender;
            ctx.fillStyle = 'rgba(237,113,54,.6)';
            ctx.lineTo(start, end);
        }
        ctx.fill();
        ctx.closePath();
    },100)
    

    //绘制覆盖区域点值
    for(let j = 0; j < regionVal.lineCount; j ++){
    	ctx.beginPath();
    	let dataRender = regionVal.data[j].value/100*Math.pow(speed,4);
        let start = regionVal.x + regionVal.radius * Math.cos(regionVal.angle * j)*dataRender;
    	let end = regionVal.y + regionVal.radius * Math.sin(regionVal.angle * j)*dataRender;
        ctx.arc(start, end, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(248,84,22,.5)';
        ctx.fill();
    }
    
}