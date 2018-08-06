var clientWidth = 0;
var clientHeight = 0;
var canvas_top = null;

function canvas_start() {
    new lineCanvas({
        el: document.getElementById("canvas"), //绘制canvas的父级div
        //saveEl: document.getElementById("saveCanvas"), //保存按钮
        //      linewidth:1,//线条粗细，选填
        //      color:"black",//线条颜色，选填
        //      background:"#ffffff"//线条背景，选填
    });
}

function clearEl() {
    canvas_top.getContext("2d").clearRect(0, 0, clientWidth, clientHeight);
}

function respImg() {
    return canvas_top.toDataURL();
}

function lineCanvas(obj) {
    this.linewidth = 1;
    this.color = "#000000";
    this.background = "#ffffff";
    for (var i in obj) {
        this[i] = obj[i];
    };
    this.canvas = document.createElement("canvas");
    this.el.appendChild(this.canvas);
    canvas_top = this.canvas;
    this.cxt = this.canvas.getContext("2d");
    this.canvas.width = this.el.clientWidth;
    this.canvas.height = this.el.clientHeight;
    clientWidth = this.canvas.width;
    clientHeight = this.canvas.height;
    this.cxt.fillStyle = this.background;
    this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.width);
    this.cxt.strokeStyle = this.color;
    this.cxt.lineWidth = this.linewidth;
    this.cxt.lineCap = "round";
    let start_y = 0;
    let start_x = 20;
    let bool = true;
    var isDragging = false
        //开始绘制
    this.canvas.addEventListener("touchstart", function(e) {
        document.getElementsByClassName('scroll-content')[3].style.overflow = "hidden";
        this.cxt.beginPath();
        if (bool) {
            start_y = e.changedTouches[0].pageY;
            bool = false;
        }
        this.cxt.moveTo(e.changedTouches[0].pageX - start_x, e.changedTouches[0].pageY - start_y);
    }.bind(this), false);
    //绘制中
    this.canvas.addEventListener("touchmove", function(e) {
        isDragging = true;
        this.cxt.lineTo(e.changedTouches[0].pageX - start_x, e.changedTouches[0].pageY - start_y);
        this.cxt.stroke();
    }.bind(this), false);
    //结束绘制
    this.canvas.addEventListener("touchend", function() {
        document.getElementsByClassName('scroll-content')[3].style.overflow = "scroll";
        this.cxt.closePath();
    }.bind(this), false);
    // document.getElementsByClassName('scroll-content')[3].onscroll = function() {
    //         console.log(isDragging);
    //         if (isDragging) {
    //             console.log(4);
    //             return false;
    //         }
    //         console.log(5);
    //     }
    //保存图片，直接转base64
    // this.saveEl.addEventListener("click", function() {
    //     var imgBase64 = this.canvas.toDataURL();
    //     console.log(imgBase64);
    // }.bind(this), false);
};