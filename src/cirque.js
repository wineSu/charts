/**
 * @Author   SuZhe
 * @DateTime 2018-11-07
 * @desc     进度圆环
 * @param    {[Object]}   ctx         [canvas对象]
 * @param    {[Object]}   circleValue [参数默认值]
 * @param    {[Number]}   percent     [进度比例]
 */
let Cirque = function(percent){
	const ctx = this.ctx;
	const circleValue = this.circleValue;

	//打底 圆环 绘制
	ctx.lineWidth = circleValue.arcWidth;
	ctx.beginPath(); 
	let grd = ctx.createRadialGradient(circleValue.x, circleValue.y, circleValue.radius - 10, circleValue.x, circleValue.y, circleValue.radius + 9);
	grd.addColorStop(0,"#e9eae9");
	grd.addColorStop("0.8","#fefefe");
	grd.addColorStop("1","#e9eae9");
	ctx.strokeStyle = grd;
	ctx.arc(circleValue.x, circleValue.y, circleValue.radius, circleValue.startAngle, circleValue.endAngle, circleValue.anticlockwise);
	ctx.closePath(); 
	ctx.stroke();
	
	//展示进度圆环绘制
	ctx.lineWidth = circleValue.arcWidth;
	ctx.beginPath();
	let linear = ctx.createLinearGradient(220,220,380,200);
	linear.addColorStop(0,'#ffc26b');
	linear.addColorStop(0.5,'#ff9a5f');
	linear.addColorStop(1,'#ff8157');
	ctx.strokeStyle = linear;
	ctx.arc(circleValue.x, circleValue.y, circleValue.radius, circleValue.startAngle, circleValue.endAngle*percent, circleValue.anticlockwise);
	ctx.stroke();
	
	//进度起点圆角
	ctx.beginPath();
	ctx.fillStyle = '#ff8157';
	ctx.arc(circleValue.x + circleValue.radius, circleValue.y - 1, circleValue.arcWidth/2, circleValue.startAngle, circleValue.endAngle, circleValue.anticlockwise);
	ctx.closePath();
	ctx.fill();
	
	//终点圆角
	ctx.lineWidth = circleValue.arcWidth - 10;
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.strokeStyle = '#ff7854';
	let getX = circleValue.x + circleValue.radius * Math.cos(2 * percent * Math.PI),
		getY = circleValue.y + circleValue.radius * Math.sin(2 * percent * Math.PI);
	ctx.arc(getX , getY, circleValue.arcWidth - 8, circleValue.startAngle, circleValue.endAngle, circleValue.anticlockwise);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

export default Cirque;