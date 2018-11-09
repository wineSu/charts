//固定资源
import utils from './utils';
import "../css/main.css";

//动画
import Animation from './drawAnimation';
//圆环进度
import Cirque from './cirque';
//坐标轴
import {drawAxis, drawPoint, drawLine, drawBar}  from './drawAxis';
//扇形图
import drawPie from './drawPie';
//雷达图
import drawRegion from './drawRegion';

;(function(window,undefined){
	function Charts(defaultParam){
		return new Charts.prototype.init(defaultParam);
	}
	
	Charts.prototype = {
		init: function(defaultParam){
			//初始化元素类
			let _this = this,
				//canva父节点
				_canvasParDom = document.getElementById(defaultParam.id), 
				//容器宽度 
				_parWid = _canvasParDom.clientWidth,
				//容器高度
				_parHei = _canvasParDom.clientHeight,
				//创建canvas节点
				_canvas = document.createElement("canvas"),
				//默认参数
				setDefault = {
					styleSet:{
						borderColor:'#ff984e',
						lineColor:'#ff984e',
						pointColor:'#ff7854'
					},
					data:[],
					x: 32,
					padding: 10,
					fontSize: '20px',
					wd: _parWid*2,
					ht: _parHei*2 - 20,
					lineWidth: 2,
					barColor:'#199475',
					pieColor:['#546570', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a']
				};

			//获取当前类ctx
			this.ctx = _canvas.getContext("2d");
			this.canvas = _canvas;

			//设置canvas实际宽度  为当前父元素两倍宽度  再缩放canvas的样式宽度  避免手机展示不清晰
			_canvas.width  = _parWid*2;
			_canvas.height = _parHei*2;
			//添加子节点
			_canvasParDom.appendChild(_canvas);
			this.defaultParam = utils.extend(setDefault,defaultParam);
			//去除边界宽度(防止图表区的溢出)
			this.defaultParam.wid = _canvas.width - 10;
			//获取数据的最大值并设置峰值0.82比例
			this.defaultParam.maxPoint = utils.maxData(this.defaultParam.data) / 0.82;
			switch(defaultParam.type){
				case 'cirque':
					//元环比
					let circleValue = {
							x : setDefault.wd / 2,
							y : setDefault.ht / 2,
							radius : 200,
							startAngle : 0,
							endAngle : 2 * Math.PI,
							anticlockwise : false,
							arcWidth: 18,
							current:80
						};
					this.circleValue = utils.extend(circleValue,defaultParam);
					Animation.call(this,{
						percent: this.circleValue.current,
						render: (current)=>{
							Cirque.call(this,current/100);
						}
					});
				break;

				case 'line':
					Animation.call(this,{
						percent: 100,
						render: (current)=>{
							drawLine.call(this,current/100);
							drawAxis.call(this);
							drawPoint.call(this,current/100);
						}
					});
				break;

				case 'bar':
					Animation.call(this,{
						percent: 100,
						render: (current)=>{
							drawBar.call(this,current/100);
							drawPoint.call(this,current/100,10);
							drawAxis.call(this);
						}
					});
					
				break;

				case 'pie':
					let pieValues = {
							x : setDefault.wd / 2,
							y : _canvas.height / 2,
							radius : 160,
							startAngle : 0,
							endAngle : 2 * Math.PI,
							anticlockwise : false,
							innerRadius:0
						};
					this.pieValues = utils.extend(pieValues,defaultParam);
					Animation.call(this,{
						percent: 100,
						render: (current)=>{
							drawPie.call(this,current/100);
						}
					});
				break;

				case 'region':
					let regionVal = {
						lineCount: 6,
						x : setDefault.wd / 2,
						y : _canvas.height / 2,
						radius: _canvas.height / 2,    //半径
						angle: Math.PI * 2 / 6         //内角和
					};
					this.regionVal = utils.extend(regionVal,defaultParam);
					Animation.call(this,{
						percent: 100,
						render: (current)=>{
							drawRegion.call(this,current/100);
						}
					});
					this.canvas.style = 'background:#161627;'
				break;

			}
			return this;
		}
	}
	//内部指针  重新指向
    Charts.prototype.init.prototype = Charts.prototype;
	
    if(!window.Charts){
        window.Charts =  Charts;
    }
    
})(window,undefined);

