/**
 * @Author   SuZhe11111111
 * @DateTime 2018-11-07
 * @desc     绘制坐标轴线
 */
export function drawAxis() {
	let defaultParam = this.defaultParam,
		ctx = this.ctx,
		pad = defaultParam.padding,
		bottompad = 10,
		wd = defaultParam.wd,
		ht = defaultParam.ht;
	ctx.beginPath();
	//手机端1px线条问题修复
	ctx.translate(0.5, 0.5);
	//10为默认边界宽度
	ctx.moveTo(pad, pad);
	ctx.lineTo(pad, ht - bottompad);
	ctx.moveTo(pad, ht - bottompad);
	ctx.lineTo(wd - pad, ht - bottompad);
	ctx.strokeStyle = defaultParam.styleSet.borderColor;
	ctx.stroke();
	ctx.closePath();
}

/**
 * @Author   SuZhe
 * @DateTime 2018-11-07
 * @desc     坐标轴上的点
 */
export function drawPoint(x = 0) {
	let defaultParam = this.defaultParam,
		ctx = this.ctx,
		nums = defaultParam.data,
		len = nums.length,
		ht = defaultParam.ht;
	//初始定义线条
	ctx.lineWidth = 3;
	for (let i = 0; i < len; i++) {
		let yVal = nums[i].yVal,
			xVal = nums[i].xVal,
			numsY = ht - ht * yVal / defaultParam.maxPoint - 10,
			numsX = i * (defaultParam.wid / nums.length - 1) + defaultParam.x;
		//绘制折线点
		if (defaultParam.type == 'line') {
			ctx.beginPath();
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
			ctx.shadowBlur = 8;
			ctx.shadowColor = defaultParam.styleSet.pointColor;
			ctx.fillStyle = defaultParam.styleSet.pointColor;
			ctx.strokeStyle = '#fff';
			ctx.setLineDash([80, 80]);
			ctx.arc(numsX, numsY, 6, 0, 2 * Math.PI, false);
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
		//折线上的点值  
		ctx.shadowBlur = 0;
		ctx.fillStyle = '#222';
		ctx.textAlign = 'center';
		ctx.font = defaultParam.fontSize + " Microsoft YaHei";
		ctx.fillText(yVal, numsX + x, numsY - 20);
		ctx.strokeStyle = '#fff';
		//绘制横坐标
		if (i < nums.length) {
			let rowText = ctx.measureText(xVal);
			ctx.textAlign = 'left';
			ctx.fillText(xVal, numsX + x - rowText.width / 2, ht + 18);
		} else if (i == nums.length) {
			return;
		}
		ctx.closePath();
		ctx.stroke();
	}
}

/**
 * @Author   SuZhe
 * @DateTime 2018-11-07
 * @desc     数据连接线或柱状图
 */
export function drawLine() {
	let defaultParam = this.defaultParam,
		ctx = this.ctx,
		bottompad = 10,
		nums = defaultParam.data,
		ht = defaultParam.ht,
		maxPoint = defaultParam.maxPoint,
		len = nums.length - 1,
		type = defaultParam.type,
		typeLne = type == 'line' ? len : len + 1,
		rectHei = this.canvas.height - bottompad * 2 - defaultParam.padding;
	for (let i = 0; i < typeLne; i++) {
		//起始坐标
		let yVal = nums[i].yVal,
			axiosY = ht - ht * (yVal) / maxPoint - bottompad,
			averNum = (defaultParam.wid / nums.length - 1),
			axiosX = i * averNum + defaultParam.x;
		if (type == 'line') {
			//终止坐标  
			let axiosNY = ht - ht * (nums[i + 1].yVal) / maxPoint - bottompad,
				axiosNX = (i + 1) * averNum + defaultParam.x;
			//划线
			ctx.beginPath();
			ctx.setLineDash([1, 1]);
			ctx.moveTo(axiosX, axiosY);
			ctx.lineTo(axiosNX, axiosNY);
			ctx.lineWidth = defaultParam.lineWidth;
			ctx.strokeStyle = defaultParam.styleSet.lineColor;
			ctx.closePath();
			ctx.stroke();
			//x轴上纵线
			ctx.beginPath();
			ctx.setLineDash([6, 6]);
			if (i == 0) {
				ctx.moveTo(axiosX, ht - bottompad);
				ctx.lineTo(axiosX, axiosY);
			}
			ctx.moveTo(axiosNX, ht - bottompad);
			ctx.lineTo(axiosNX, axiosNY);
			ctx.lineWidth = 1;
			ctx.strokeStyle = "#d6d6d6";
			ctx.stroke();
			ctx.closePath();
		} else if (type == 'bar') {
			ctx.beginPath();
			ctx.fillStyle = defaultParam.barColor;
			ctx.fillRect(axiosX - 10, axiosY, 40, rectHei - axiosY);
			ctx.fill();
			ctx.closePath();
		}
	}
}