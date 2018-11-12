/**
 * @Author   SuZhe
 * @DateTime 2018-11-07
 * @desc     绘制坐标轴线
 */
export function drawAxis () {
	let defaultParam = this.defaultParam,
		ctx = this.ctx,
		pad = defaultParam.padding+0.5,
		bottompad = 10.5,
		wd = defaultParam.wd,
		ht = defaultParam.ht;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.setLineDash([1,1]);
	//手机端1px线条问题修复(动画方式下直接在参数上增加0.5  不采用translate方式)
	// ctx.translate(0.5, 0.5);
	//10为默认边界宽度
    ctx.moveTo(pad,pad);
    ctx.lineTo(pad,ht - bottompad);
    ctx.moveTo(pad,ht -bottompad);
    ctx.lineTo(wd - pad,ht -bottompad);
    ctx.strokeStyle = defaultParam.styleSet.borderColor;
    ctx.stroke();
    ctx.closePath();
}

/**
 * @Author   SuZhe
 * @DateTime 2018-11-07
 * @desc     坐标轴上的点以及顶点数据值
 */
export function drawPoint(speed,x = 0) {
	let defaultParam = this.defaultParam,
		ctx = this.ctx,
		nums = defaultParam.data,
		len  = nums.length,
		type = defaultParam.type,
		ht   = defaultParam.ht;
	//初始定义线条
	ctx.lineWidth = 3;
	for (let i = 0;i < len;i ++){
        let yVal = parseInt((nums[i].yVal)*speed),
        	xVal = nums[i].xVal,
        	numsY = (ht - ht*yVal/defaultParam.maxPoint - 10),
        	numsX = i * (defaultParam.wid/nums.length-1) + defaultParam.x;
        //绘制折线点
        if(defaultParam.type == 'line'){
			ctx.beginPath();
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
			ctx.shadowBlur = 8;
			ctx.shadowColor = defaultParam.styleSet.pointColor;
			ctx.fillStyle = defaultParam.styleSet.pointColor;
			ctx.strokeStyle = '#fff';
			ctx.setLineDash([80,80]);
			ctx.arc(numsX , numsY, 6, 0, 2*Math.PI, false);
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
        //折线上的点值  
		ctx.shadowBlur = 0;
		ctx.fillStyle = '#222';
		ctx.textAlign = 'center';
		ctx.font = defaultParam.fontSize + " Microsoft YaHei";
		ctx.fillText(yVal,numsX+x,numsY-20);
		ctx.strokeStyle = '#fff';
        //绘制横坐标
        if (i < nums.length){
            let rowText = ctx.measureText(xVal);
            ctx.textAlign = 'left';
            ctx.fillText(xVal,numsX+x-rowText.width/2,ht + 18);
        }else if(i == nums.length) {
            return;
        }
        ctx.closePath();
        ctx.stroke();
    }
}

/**
 * @Author   SuZhe
 * @DateTime 2018-11-07
 * @desc     数据连接线
 */
export function drawLine(speed){
	let defaultParam = this.defaultParam,
		ctx = this.ctx,
		bottompad = 10,
		nums = defaultParam.data,
		ht   = defaultParam.ht,
		width = this.canvas.width,
		maxPoint  = defaultParam.maxPoint,
		len = nums.length-1,
		progressDots = Math.floor(speed * len),  //循序渐进 折线图
		progressFragment = speed * len - progressDots;  //加缓冲
	ctx.beginPath();
	ctx.setLineDash([1,1]);
	for (let i = 0;i < len;i ++){
        //起始坐标
        let yVal = nums[i].yVal,
        	axiosY = (ht - ht*(yVal)/maxPoint - bottompad),
        	averNum= (defaultParam.wid/nums.length-1),
        	axiosX = (i * averNum + defaultParam.x),
			//终止坐标  
    		axiosNY = (ht - ht*(nums[i+1].yVal)/maxPoint - bottompad),
    	    axiosNX = ((i+1) * averNum + defaultParam.x);
    	//渐进图
    	if(i<=progressDots){
    		//划线
    		if(i === progressDots){
    			axiosNX = (axiosNX-axiosX)*progressFragment+axiosX;
    			axiosNY = (axiosNY-axiosY)*progressFragment+axiosY;
    		}
    		ctx.moveTo(axiosX,axiosY);
	        ctx.lineTo(axiosNX,axiosNY);
	        ctx.lineWidth = defaultParam.lineWidth;
	        ctx.strokeStyle = defaultParam.styleSet.lineColor;
        }
    }
    ctx.closePath();
    ctx.stroke();
}

/**
 * @Author   SuZhe
 * @DateTime 2018-11-07
 * @desc     x轴上虚线
 */
export function drawLineXdash(speed){
	let defaultParam = this.defaultParam,
		ctx = this.ctx,
		bottompad = 10,
		nums = defaultParam.data,
		ht   = defaultParam.ht,
		maxPoint  = defaultParam.maxPoint,
		len = nums.length-1;
	for (let i = 0;i < len;i ++){
        //起始坐标
        let yVal = nums[i].yVal,
        	axiosY = (ht - ht*(yVal)/maxPoint - bottompad),
        	averNum= (defaultParam.wid/nums.length-1),
        	axiosX = (i * averNum + defaultParam.x),
			//终止坐标  
    		axiosNY = (ht - ht*(nums[i+1].yVal)/maxPoint*speed - bottompad),
    	    axiosNX = ((i+1) * averNum + defaultParam.x);
        //x轴上纵线
        ctx.beginPath();
        ctx.setLineDash([6,6]);
        if(i == 0){
        	ctx.moveTo(axiosX,ht - bottompad);
        	ctx.lineTo(axiosX,axiosY);
        }
        ctx.moveTo(axiosNX,ht - bottompad);
        ctx.lineTo(axiosNX,axiosNY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#d6d6d6";
        ctx.stroke();
        ctx.closePath();
    }
}


/**
 * @Author   SuZhe
 * @DateTime 2018-11-07
 * @desc     柱状图
 */
export function drawBar(speed){
	let defaultParam = this.defaultParam,
		ctx = this.ctx,
		bottompad = 10,
		nums = defaultParam.data,
		ht   = defaultParam.ht,
		maxPoint  = defaultParam.maxPoint,
		len = nums.length,
		rectHei = this.canvas.height - bottompad*2 - defaultParam.padding;
	for (let i = 0;i < len;i ++){
        //起始坐标
        let yVal = nums[i].yVal*speed,
        	axiosY = (ht - ht*(yVal)/maxPoint - bottompad),
        	averNum= (defaultParam.wid/nums.length-1),
        	axiosX = (i * averNum + defaultParam.x);
    	
        	ctx.beginPath();
        	let grd = ctx.createLinearGradient(axiosX-10, 0,axiosX-10+40, rectHei);
        	grd.addColorStop(1,defaultParam.barColor);
			grd.addColorStop(0,defaultParam.styleSet.lineColor);
			ctx.fillStyle = grd;
        	ctx.fillRect(axiosX-10,axiosY,40,rectHei - axiosY);
	        ctx.fill();
	        ctx.closePath();
    }
}