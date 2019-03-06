(function (window) {
    'use strict';
    // 优化：参数为对象，给options 设置了默认值
    function Food(options) {
        // options  选项
        options = options || {};
        // 给参数options 设置一个默认值{}， 防止options没有传递参数的情况下 下面代码报错
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.bgc = options.bgc || "blue";
        this.x = options.x || 0;
        this.y = options.y || 0;
    }
    Food.prototype.render = function (target) {
        var div = document.createElement("div");
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.bgc;

        // 随机位置： 随机食物的x y坐标
        this.x = parseInt(Math.random() * target.offsetWidth / this.width); // [0, 40)
        this.y = parseInt(Math.random() * target.offsetHeight / this.height);

        // 坑： left、top的设置需要有定位
        div.style.position = "absolute";
        // 根据上面随机出来的坐标去计算食物的位置（left、top）
        div.style.left = this.x * this.width + "px";
        div.style.top = this.y * this.height + "px";
        // 3.
        target.appendChild(div);
    }
    window.Food = Food;
})(window);
