import utils from './utils';

/**
 * @Author   SuZhe
 * @DateTime 2018-11-08
 * @desc     绘制扇形 或 圆环
 */
export default function drawPie(speed) {
    const defaultParam = this.defaultParam,
        ctx = this.ctx,
        circleValue = this.pieValues,
        datas = defaultParam.data,
        total = utils.getTotalValue(datas);
    let x = circleValue.x,
        y = circleValue.y,
        x1 = 0,
        y1 = 0,
        startAngle = 0,
        endAngle = 0;

    for (let i = 0, len = datas.length; i < len; i++) {
        ctx.beginPath();
        ctx.fillStyle = defaultParam.pieColor[i];
        ctx.moveTo(x, y);
        endAngle = startAngle + datas[i].value / total * 2 * Math.PI * speed;
        ctx.arc(x, y, circleValue.radius, startAngle, endAngle, circleValue.anticlockwise);
        ctx.closePath();
        ctx.fill();

        //数据线提示
        ctx.beginPath();
        //获取中值  判断象限
        let middleData = (endAngle + startAngle) / 2;
        //计算圆边缘坐标
        x1 = Math.ceil(Math.abs(circleValue.radius * Math.cos(middleData)));
        y1 = Math.floor(Math.abs(circleValue.radius * Math.sin(middleData)));
        ctx.strokeStyle = defaultParam.pieColor[i];
        ctx.font = defaultParam.fontSize + " Microsoft YaHei";
        if (middleData > 0 && middleData <= Math.PI / 2) {
            //第一象限
            ctx.textAlign = 'right';
            ctx.moveTo(x + x1, y + y1);
            ctx.lineTo(x + x1 + 10, y + y1 + 10);
            ctx.moveTo(x + x1 + 10, y + y1 + 10);
            ctx.lineTo(x + x1 + circleValue.radius / 2 - 20, y + y1 + 10);
            ctx.stroke();
            ctx.fillText(datas[i].value, x + x1 + 5 + circleValue.radius / 2, y + y1 + 15);
        } else if (middleData > Math.PI / 2 && middleData <= Math.PI) {
            //第二象限
            ctx.textAlign = 'left';
            ctx.moveTo(x - x1, y + y1);
            ctx.lineTo(x - x1 - 10, y + y1 + 10);
            ctx.moveTo(x - x1 - 10, y + y1 + 10);
            ctx.lineTo(x - x1 - circleValue.radius / 2 + 20, y + y1 + 10);
            ctx.stroke();
            ctx.fillText(datas[i].value, x - x1 - 5 - circleValue.radius / 2, y + y1 + 15);
        } else if (middleData > Math.PI && middleData <= Math.PI * 1.5) {
            //第三象限
            ctx.textAlign = 'left';
            ctx.moveTo(x - x1, y - y1);
            ctx.lineTo(x - x1 - 10, y - y1 - 10);
            ctx.moveTo(x - x1 - 10, y - y1 - 10);
            ctx.lineTo(x - x1 - circleValue.radius / 2 + 20, y - y1 - 10);
            ctx.stroke();
            ctx.fillText(datas[i].value, x - x1 - 5 - circleValue.radius / 2, y - y1 - 5);
        } else {
            //第四象限
            ctx.textAlign = 'right';
            ctx.moveTo(x + x1, y - y1);
            ctx.lineTo(x + x1 + 10, y - y1 - 10);
            ctx.moveTo(x + x1 + 10, y - y1 - 10);
            ctx.lineTo(x + x1 + circleValue.radius / 2 - 20, y - y1 - 10);
            ctx.stroke();
            ctx.fillText(datas[i].value, x + x1 + 5 + circleValue.radius / 2, y - y1 - 5);
        }

        //图例
        ctx.beginPath();
        ctx.fillStyle = defaultParam.pieColor[i];
        ctx.fillRect(10, defaultParam.padding + 20 + 21 * i, 24, 14);
        ctx.fillStyle = '#000';
        ctx.font = '16px Microsoft YaHei';
        ctx.textAlign = 'left';
        ctx.fillText(datas[i].name, 40, defaultParam.padding * 2 + 20 + 22 * i);
        ctx.closePath();

        startAngle = endAngle;
    }
    //圆环
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(circleValue.x, circleValue.y, circleValue.innerRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}
