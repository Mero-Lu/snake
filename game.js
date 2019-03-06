(function (window) {
    'use strict';
    function Game(target) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = target;
    }
    //专门用来渲染对象添加到地图上
    Game.prototype.render = function () {
        this.food.render(this.map);
        this.snake.render(this.map);
    }

    //开始游戏的功能
    Game.prototype.start = function () {
        var that = this;
        var timeId = setInterval(function () {
            that.snake.move(that.map, that.food);
            var ret = that.gameOver();
            if (ret) {
                // 游戏结束了
                alert("Game Over");
                clearInterval(timeId);
            }
        }, 200)
    }

    //专门用来做游戏结束的判断
    Game.prototype.gameOver = function () {
        var isOver = false; // isOver 标志：游戏还没有结束
        var that = this;
        //蛇撞墙
        //蛇头的坐标
        var head = that.snake.body[0];
        //判断蛇头碰到四周墙壁游戏结束
        if (head.x < 0 || head.x >= that.map.offsetWidth / that.snake.width
            || head.y < 0 || head.y >= that.map.offsetHeight / that.snake.height) {
            isOver = true;
        }
        //蛇吃到自己判断
        for (var i = 4; i < that.snake.body.length; i++) {
            //蛇头的坐标
            var item = that.snake.body[i];//蛇的每一节
            if (head.x == item.x && head.y == item.y) {
                isOver = true;
            }
        }
        return isOver; // 将游戏的标志返回出去
    }

    //专门用来绑定事件
    Game.prototype.bindEvent = function () {
        // 注册键盘事件 -- 修改蛇的direction属性即可
        var that = this;
        document.addEventListener('keyup', function (event) {
            //事件对象中的this指向事件源
            var keycode = event.keyCode;
            switch (keycode) {
                case 37: //左
                    if (that.snake.direction != 'right') {
                        that.snake.direction = 'left';
                    }
                    break;
                case 38: //上
                    if (that.snake.direction != 'down') {
                        that.snake.direction = 'up';
                    }
                    break;
                case 39: //右
                    if (that.snake.direction != 'left') {
                        that.snake.direction = 'right';
                    }
                    break;
                case 40: //下
                    if (that.snake.direction != 'up') {
                        that.snake.direction = 'down';
                    }
                    break;
            }
        })
    }

    Game.prototype.startGame = function () {
        this.start();
        this.bindEvent();
    };
    
    window.Game = Game;
    // 蛇吃食物 -- 蛇移动一次，需要判断一次，是否有吃到食物
    // 判断标准： 蛇头的坐标和食物的坐标是否重合了
    // 代码逻辑需要写在哪？写在move方法里面，吃食物交给蛇自己处理

    // 蛇吃到自己了 -- 游戏结束了
    // 判断标准： 蛇头和蛇身体的坐标是否发生重合了
    // 代码逻辑需要写在哪？ 蛇移动一次，就需要判断一次有没有吃到自己
    //      写在定时器里面，在move方法后面
})(window);