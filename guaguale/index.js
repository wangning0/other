var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
//画蒙布
context.beginPath();
context.fillStyle = 'grey'
context.fillRect(0, 0, 400, 300);
//鼠标按下开刮
canvas.onmousedown = function() {
        canvas.onmousemove = function() {
            //获取鼠标坐标
            var x = event.clientX;
            var y = event.clientY;
            //destination-out             显示原来的不在后来区域的部分
            context.globalCompositeOperation = "destination-out";
            context.beginPath();
            context.arc(x - 200, y, 30, 0, Math.PI * 2);
            context.fill();
        }
    }
    //鼠标抬起不刮开
canvas.onmouseup = function() {
    canvas.onmousemove = function() {}
}