/**
 * 公共插件
 */
let utils = {
	/**
	 * @Author   SuZhe
	 * @DateTime 2018-11-07
	 * @desc     参数合并
	 * @param    {[Object]}   defaults [默认参数]
	 * @param    {[Object]}   newObj   [用户设置参数]
	 */
	extend: function(defaults,newObj){
		for (var i in newObj) {
			defaults[i] = newObj[i];
		}
		return defaults;
	},
	/**
	 * @Author   SuZhe
	 * @DateTime 2018-11-07
	 * @desc     获取最大值
	 * @param    {[Array]}   arr [数组对象]
	 * @return   {[Number]}      [数组最大值]
	 */
	maxData:function(arr){
		let newArr = [];
		arr.map((item) => {
			newArr.push(item.yVal);
		})
		return Math.max.apply(null,newArr)
	},
	/**
	 * @Author   SuZhe
	 * @DateTime 2018-11-08
	 * @desc     清除canvas圆
	 * @param    {[Object]}   ctx [canvas ctx]
	 * @param    {[Number]}   x   [圆心坐标X]
	 * @param    {[Number]}   y   [圆心坐标Y]
	 * @param    {[Number]}   r   [半径]
	 */
	clearArc:function(ctx,x,y,r){
		for(var i=0; i< Math.round(Math.PI * r); i++){
	        var angle = (i / Math.round(Math.PI * r)) * 360;
	        ctx.clearRect(x, y, Math.sin(angle * (Math.PI / 180)) * r , Math.cos(angle * (Math.PI / 180)) * r);
	    }
	},
	/**
	 * @Author   SuZhe
	 * @DateTime 2018-11-08
	 * @desc     获取总数据和（用于扇形区域）
	 * @param    {[Object]}   data [数组对象]
	 * @return   {[Number]}        [数据总和]
	 */
	getTotalValue: function (data) {
        var total = 0;
        for (let i = 0,len = data.length; i < len; i++) {
            total += data[i].value;
        }
        return total;
    }
}

export default utils;