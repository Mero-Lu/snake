(function(window){
    'use strict';
     //定义一个蛇的构造函数
     function Snake(options) {
        options = options || {};
        this.width = options.width ||20;
        this.height = options.height || 20;
        this.headBgc = options.headBgc || 'red';
        this.bodyBgc = options.bodyBgc || 'green';
        this.direction = options.direction || "right"; // 默认朝右走
        // 蛇移动的方向也是一个属性
        this.body = options.body || [
            {x : 2, y : 0}, //蛇头的位置  坐标位置
            {x : 1, y : 0}, //蛇身体的位置
            {x : 0, y : 0}  //蛇尾的位置
        ];
    }
    //渲染蛇 ,添加到原型上
    Snake.prototype.render = function(target) {
        //1.根据body 创建蛇的每一节
        for(var i = 0;i < this.body.length; i++) {
            var span = document.createElement('span');  //这是创建的每一节蛇身
            //设置样式
            span.style.width = this.width + 'px';
            span.style.height = this.height + 'px';
            
            //设置蛇的颜色 蛇头和身体
            span.style.backgroundColor = i === 0 ? this.headBgc :this.bodyBgc;
            //设置蛇的位置
            span.style.position = 'absolute';
            span.style.left = this.body[i].x * this.width + 'px';
            span.style.top = this.body[i].y * this.height + 'px';
            //添加到地图上
            target.appendChild(span);
        }
    }
    //蛇移动,添加到原型上
    Snake.prototype.move = function(target,food) {  // 把food对象当参数传进来
        // console.log(1)
        //得到蛇头的位置
        var newHead = {
            x : this.body[0].x,
            y : this.body[0].y
        };
        switch(this.direction) {
            case "left" :
                newHead.x--;
                break;
            case "up" :
                newHead.y--;
                break;
            case 'right' :
                newHead.x++;
                break;
            case 'down' :
                newHead.y++;
                break;
        }
        //蛇吃食物
        //判断第一个蛇头的坐标是不是等于食物的坐标
        if(newHead.x === food.x && newHead.y === food.y) {
            var div = target.querySelector('div'); //获取到食物,然后删除食物
            target.removeChild(div);

            food.render(target); //重新随机渲染一个食物
        }else {
            this.body.pop(); // 如果没有吃到就删除最后一个
        }
        this.body.unshift(newHead);
        var spans = document.querySelectorAll('span');
        for(var i = 0;i < spans.length;i++) {
            target.removeChild(spans[i]);
        }
        this.render(target);
    }
    window.Snake = Snake;
})(window);
     



