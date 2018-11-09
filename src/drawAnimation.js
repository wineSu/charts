/**
 * @Author   SuZhe
 * @DateTime 2018-11-07
 * @desc     圆环进度比初始加载动画
 * @param    {Object}   param [动画需要的参数]
 */

export default function Animation(param) {
	let current = 0;
	let looped;
	let ctx      = this.ctx;
	let _canvas  = this.canvas;
	let callback = param.callback;
	(function looping(){
		looped = requestAnimationFrame(looping);
	    if(current < param.current){
	    	ctx.clearRect(0,0,_canvas.width,_canvas.height);
	        current = (current + 2) > 100 ? 100 : current+2;
	        callback(current);
	    }else{
	        window.cancelAnimationFrame(looped);
	        looped = null;
	    }
	})();
}