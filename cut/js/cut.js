cutImg = {
    //原始图片大小
    imgWidth : 0 ,
    imgHeight : 0 ,
    //展示框大小
    showWidth : 0 ,
    showHeight : 0 ,
    //图片压缩后大小
    boxWidth : 0 ,
    boxHeight : 0 ,
    //压缩比例
    imgZoom : 1 ,
    //图片在box的位置
    boxTop : 0 ,
    boxBottom : 0 ,
    boxLeft : 0 ,
    boxRight : 0 ,
    //cut在box的位置
    cutTop : 0 ,
    cutLeft : 0 ,
    //cut在box的宽高
    cutLength : 0 ,
    //伸缩类型
    zoomType : null ,
    //最大移动位置
    xMax : null ,
    xMin : null ,
    yMax : null ,
    yMin : null ,
    //上次移动位置
    clientX : null ,
    clientY : null ,
    //主函数
    init : function() {
        cutImg.monitor = [document.querySelector('.d100x100 span.img'),document.querySelector('.d60x60 span.img'),document.querySelector('.d40x40 span.img')];
        cutImg.dom_body = document.querySelector('body');
        cutImg.dom_cutbox = document.querySelector('#cutbox');
        cutImg.dom_shade = document.querySelector('#cutbox div.shade');
        cutImg.dom_shade_img = document.querySelector('#cutbox div.shade img');
        cutImg.dom_cut = document.querySelector('#cutbox div.cut');
        cutImg.dom_cut_div = document.querySelector('#cutbox div.cut div');
        cutImg.dom_cut_div_img = document.querySelector('#cutbox div.cut div span.img');
        setTimeout(function() {
            cutImg.imgWidth = cutImg.dom_shade_img.width;
            cutImg.imgHeight = cutImg.dom_shade_img.height;
            cutImg.showWidth = cutImg.dom_cutbox.clientWidth;
            cutImg.showHeight = cutImg.dom_cutbox.clientHeight;
            cutImg.zoomImg();
            cutImg.cutShow();
            cutImg.imgShow();
        },0);
    },
    //缩放图片展示
    zoomImg : function() {
        var ratioW = cutImg.imgWidth/cutImg.showWidth;
        var ratioH = cutImg.imgHeight/cutImg.showHeight;
        if(ratioW <= 1 && ratioH <= 1) {
            //图片未充满
            cutImg.imgZoom = 1;
            cutImg.boxWidth = cutImg.imgWidth;
            cutImg.boxHeight = cutImg.imgHeight;
        }else if(ratioW > ratioH) {
            //宽冗余
            cutImg.imgZoom = ratioW;
            cutImg.boxWidth = cutImg.showWidth;
            cutImg.boxHeight = cutImg.imgHeight/cutImg.imgZoom|0;
        }else {
            //高冗余
            cutImg.imgZoom = ratioH;
            cutImg.boxWidth = cutImg.imgWidth/cutImg.imgZoom|0;
            cutImg.boxHeight = cutImg.showHeight;
        }
        cutImg.dom_shade.style.width = cutImg.boxWidth + 'px';
        cutImg.dom_shade.style.height = cutImg.boxHeight + 'px';
        cutImg.dom_shade_img.style.width = cutImg.boxWidth + 'px';
        cutImg.dom_shade_img.style.height = cutImg.boxHeight + 'px';
        cutImg.boxTop = (cutImg.showHeight - cutImg.boxHeight)/2|0;
        cutImg.boxBottom = cutImg.showHeight - cutImg.boxHeight - cutImg.boxTop;
        cutImg.boxLeft = (cutImg.showWidth - cutImg.boxWidth)/2|0;
        cutImg.boxRight = cutImg.showWidth - cutImg.boxWidth - cutImg.boxLeft;
        cutImg.dom_shade.style.top = cutImg.boxTop + 'px';
        cutImg.dom_shade.style.left = cutImg.boxLeft + 'px';
        cutImg.dom_shade_img.style.visibility = 'visible';
    },
    //控制框展示
    cutShow : function() {
        cutImg.dom_cut.style.display = 'block';
        cutImg.cutLength = cutImg.dom_cut.clientWidth;
        cutImg.cutTop = cutImg.boxTop + (cutImg.boxHeight/2|0) - (cutImg.cutLength/2|0);
        cutImg.cutLeft = cutImg.boxLeft + (cutImg.boxWidth/2|0) - (cutImg.cutLength/2|0);
        cutImg.dom_cut.style.top = cutImg.cutTop + 'px';
        cutImg.dom_cut.style.left = cutImg.cutLeft + 'px';
        cutImg.dom_cut.onmousedown = function(e) {
            var top = cutImg.cutTop - cutImg.boxTop;
            var bottom = cutImg.showHeight - cutImg.boxBottom - cutImg.cutLength - cutImg.cutTop;
            var left = cutImg.cutLeft - cutImg.boxLeft;
            var right = cutImg.showWidth - cutImg.boxRight - cutImg.cutLength - cutImg.cutLeft;
            cutImg.xMax = e.clientX + right;
            cutImg.xMin = e.clientX - left;
            cutImg.yMax = e.clientY + bottom;
            cutImg.yMin = e.clientY - top;
            cutImg.clientX = e.clientX;
            cutImg.clientY = e.clientY;
            cutImg.dom_body.onmousemove = cutImg.move;
            cutImg.setCursor('move');
            e.stopPropagation();
        };
        document.querySelector('#cutbox div.cut em.l').onmousedown = function(e) {
            var top = cutImg.cutTop - cutImg.boxTop;
            var bottom = cutImg.showHeight - cutImg.boxBottom - cutImg.cutLength - cutImg.cutTop;
            var left = cutImg.cutLeft - cutImg.boxLeft;
            var right = cutImg.showWidth - cutImg.boxRight - cutImg.cutLength - cutImg.cutLeft;
            cutImg.xMax = e.clientX + Math.min(cutImg.cutLength - 20);
            cutImg.xMin = e.clientX - Math.min(left,top*2,bottom*2);
            cutImg.clientX = e.clientX;
            cutImg.clientY = e.clientY;
            cutImg.zoomType = 'l';
            cutImg.dom_body.onmousemove = cutImg.zoom;
            cutImg.setCursor('w-resize');
            e.stopPropagation();
        };
        document.querySelector('#cutbox div.cut em.lt').onmousedown = function(e) {
            var top = cutImg.cutTop - cutImg.boxTop;
            var bottom = cutImg.showHeight - cutImg.boxBottom - cutImg.cutLength - cutImg.cutTop;
            var left = cutImg.cutLeft - cutImg.boxLeft;
            var right = cutImg.showWidth - cutImg.boxRight - cutImg.cutLength - cutImg.cutLeft;
            cutImg.xMax = e.clientX + Math.min(cutImg.cutLength - 20);
            cutImg.xMin = e.clientX - Math.min(left,top);
            cutImg.clientX = e.clientX;
            cutImg.clientY = e.clientY;
            cutImg.zoomType = 'lt';
            cutImg.dom_body.onmousemove = cutImg.zoom;
            cutImg.setCursor('nw-resize');
            e.stopPropagation();
        };
        document.querySelector('#cutbox div.cut em.lb').onmousedown = function(e) {
            var top = cutImg.cutTop - cutImg.boxTop;
            var bottom = cutImg.showHeight - cutImg.boxBottom - cutImg.cutLength - cutImg.cutTop;
            var left = cutImg.cutLeft - cutImg.boxLeft;
            var right = cutImg.showWidth - cutImg.boxRight - cutImg.cutLength - cutImg.cutLeft;
            cutImg.xMax = e.clientX + Math.min(cutImg.cutLength - 20);
            cutImg.xMin = e.clientX - Math.min(left,bottom);
            cutImg.clientX = e.clientX;
            cutImg.clientY = e.clientY;
            cutImg.zoomType = 'lb';
            cutImg.dom_body.onmousemove = cutImg.zoom;
            cutImg.setCursor('sw-resize');
            e.stopPropagation();
        };
        document.querySelector('#cutbox div.cut em.r').onmousedown = function(e) {
            var top = cutImg.cutTop - cutImg.boxTop;
            var bottom = cutImg.showHeight - cutImg.boxBottom - cutImg.cutLength - cutImg.cutTop;
            var left = cutImg.cutLeft - cutImg.boxLeft;
            var right = cutImg.showWidth - cutImg.boxRight - cutImg.cutLength - cutImg.cutLeft;
            cutImg.xMax = e.clientX + Math.min(right,top*2,bottom*2);
            cutImg.xMin = e.clientX - Math.min(cutImg.cutLength - 20);
            cutImg.clientX = e.clientX;
            cutImg.clientY = e.clientY;
            cutImg.zoomType = 'r';
            cutImg.dom_body.onmousemove = cutImg.zoom;
            cutImg.setCursor('e-resize');
            e.stopPropagation();
        };
        document.querySelector('#cutbox div.cut em.rt').onmousedown = function(e) {
            var top = cutImg.cutTop - cutImg.boxTop;
            var bottom = cutImg.showHeight - cutImg.boxBottom - cutImg.cutLength - cutImg.cutTop;
            var left = cutImg.cutLeft - cutImg.boxLeft;
            var right = cutImg.showWidth - cutImg.boxRight - cutImg.cutLength - cutImg.cutLeft;
            cutImg.xMax = e.clientX + Math.min(right,top);
            cutImg.xMin = e.clientX - Math.min(cutImg.cutLength - 20);
            cutImg.clientX = e.clientX;
            cutImg.clientY = e.clientY;
            cutImg.zoomType = 'rt';
            cutImg.dom_body.onmousemove = cutImg.zoom;
            cutImg.setCursor('ne-resize');
            e.stopPropagation();
        };
        document.querySelector('#cutbox div.cut em.rb').onmousedown = function(e) {
            var top = cutImg.cutTop - cutImg.boxTop;
            var bottom = cutImg.showHeight - cutImg.boxBottom - cutImg.cutLength - cutImg.cutTop;
            var left = cutImg.cutLeft - cutImg.boxLeft;
            var right = cutImg.showWidth - cutImg.boxRight - cutImg.cutLength - cutImg.cutLeft;
            cutImg.xMax = e.clientX + Math.min(right,bottom);
            cutImg.xMin = e.clientX - Math.min(cutImg.cutLength - 20);
            cutImg.clientX = e.clientX;
            cutImg.clientY = e.clientY;
            cutImg.zoomType = 'rb';
            cutImg.dom_body.onmousemove = cutImg.zoom;
            cutImg.setCursor('se-resize');
            e.stopPropagation();
        };
        document.querySelector('#cutbox div.cut em.t').onmousedown = function(e) {
            var top = cutImg.cutTop - cutImg.boxTop;
            var bottom = cutImg.showHeight - cutImg.boxBottom - cutImg.cutLength - cutImg.cutTop;
            var left = cutImg.cutLeft - cutImg.boxLeft;
            var right = cutImg.showWidth - cutImg.boxRight - cutImg.cutLength - cutImg.cutLeft;
            cutImg.yMax = e.clientY + Math.min(cutImg.cutLength - 20);
            cutImg.yMin = e.clientY - Math.min(top,left*2,right*2);
            cutImg.clientX = e.clientX;
            cutImg.clientY = e.clientY;
            cutImg.zoomType = 't';
            cutImg.dom_body.onmousemove = cutImg.zoom;
            cutImg.setCursor('n-resize');
            e.stopPropagation();
        };
        document.querySelector('#cutbox div.cut em.b').onmousedown = function(e) {
            var top = cutImg.cutTop - cutImg.boxTop;
            var bottom = cutImg.showHeight - cutImg.boxBottom - cutImg.cutLength - cutImg.cutTop;
            var left = cutImg.cutLeft - cutImg.boxLeft;
            var right = cutImg.showWidth - cutImg.boxRight - cutImg.cutLength - cutImg.cutLeft;
            cutImg.yMax = e.clientY + Math.min(bottom,left*2,right*2);
            cutImg.yMin = e.clientY - Math.min(cutImg.cutLength - 20);
            cutImg.clientX = e.clientX;
            cutImg.clientY = e.clientY;
            cutImg.zoomType = 'b';
            cutImg.dom_body.onmousemove = cutImg.zoom;
            cutImg.setCursor('s-resize');
            e.stopPropagation();
        };
        cutImg.dom_body.onmouseup = cutImg.dom_body.onmouseleave =  function(e) {
            cutImg.dom_body.onmousemove = null;
            cutImg.setCursor('');
            cutImg.zoomType = null;
            cutImg.xMax = null;
            cutImg.xMin = null;
            cutImg.yMax = null;
            cutImg.yMin = null;
            cutImg.clientX = null;
            cutImg.clientY = null;
            e.stopPropagation();
        };
    },
    //移动
    move : function(e) {
        var x = e.clientX - cutImg.clientX;
        var y = e.clientY - cutImg.clientY;
        var top = cutImg.cutTop - cutImg.boxTop;
        var bottom = cutImg.showHeight - cutImg.boxBottom - cutImg.cutLength - cutImg.cutTop;
        var left = cutImg.cutLeft - cutImg.boxLeft;
        var right = cutImg.showWidth - cutImg.boxRight - cutImg.cutLength - cutImg.cutLeft;
        if(x > 0){
            x = Math.min(right,x);
        }else if(x < 0){
            x = -Math.min(left,-x);
        }
        if(y > 0){
            y = Math.min(bottom,y);
        }else if(y < 0){
            y = -Math.min(top,-y);
        }
        cutImg.cutLeft = cutImg.cutLeft + x;
        cutImg.cutTop = cutImg.cutTop + y;
        cutImg.dom_cut.style.left = cutImg.cutLeft + 'px';
        cutImg.dom_cut.style.top = cutImg.cutTop + 'px';
        cutImg.clientX = e.clientX;
        cutImg.clientY = e.clientY;
        if(e.clientX < cutImg.xMin - 5) {
            cutImg.clientX = cutImg.xMin;
        }
        if(e.clientX > cutImg.xMax + 5) {
            cutImg.clientX = cutImg.xMax;
        }
        if(e.clientY < cutImg.yMin - 5) {
            cutImg.clientY = cutImg.yMin;
        }
        if(e.clientY > cutImg.yMax + 5) {
            cutImg.clientY = cutImg.yMax;
        }
        cutImg.imgShow();
    },
    //缩放
    zoom : function(e) {
        var x = e.clientX - cutImg.clientX;
        var y = e.clientY - cutImg.clientY;
        var top = cutImg.cutTop - cutImg.boxTop;
        var bottom = cutImg.showHeight - cutImg.boxBottom - cutImg.cutLength - cutImg.cutTop;
        var left = cutImg.cutLeft - cutImg.boxLeft;
        var right = cutImg.showWidth - cutImg.boxRight - cutImg.cutLength - cutImg.cutLeft;
        switch(cutImg.zoomType) {
            case 'l':
                //最大范围
                if(x > 0){
                    x = Math.min(cutImg.cutLength - 20,x);
                }else {
                    x = -Math.min(-x,left,top*2,bottom*2);
                }
                if(x === 0) {
                    return;
                }
                cutImg.cutLength = cutImg.cutLength - x;
                cutImg.dom_cut.style.width = cutImg.cutLength + 'px';
                cutImg.dom_cut.style.height = cutImg.cutLength + 'px';
                cutImg.cutLeft = cutImg.cutLeft + x;
                cutImg.dom_cut.style.left = cutImg.cutLeft + 'px';
                cutImg.cutTop = cutImg.cutTop + x/2;
                cutImg.dom_cut.style.top = cutImg.cutTop + 'px';
                break;
            case 'lt':
                //最大范围
                if(x > 0){
                    x = Math.min(cutImg.cutLength - 20,x);
                }else {
                    x = -Math.min(-x,left,top);
                }
                if(x === 0) {
                    return;
                }
                cutImg.cutLength = cutImg.cutLength - x;
                cutImg.dom_cut.style.width = cutImg.cutLength + 'px';
                cutImg.dom_cut.style.height = cutImg.cutLength + 'px';
                cutImg.cutLeft = cutImg.cutLeft + x;
                cutImg.dom_cut.style.left = cutImg.cutLeft + 'px';
                cutImg.cutTop = cutImg.cutTop + x;
                cutImg.dom_cut.style.top = cutImg.cutTop + 'px';
                break;
            case 'lb':
                //最大范围
                if(x > 0){
                    x = Math.min(cutImg.cutLength - 20,x);
                }else {
                    x = -Math.min(-x,left,bottom);
                }
                if(x === 0) {
                    return;
                }
                cutImg.cutLength = cutImg.cutLength - x;
                cutImg.dom_cut.style.width = cutImg.cutLength + 'px';
                cutImg.dom_cut.style.height = cutImg.cutLength + 'px';
                cutImg.cutLeft = cutImg.cutLeft + x;
                cutImg.dom_cut.style.left = cutImg.cutLeft + 'px';
                break;
            case 'r':
                //最大范围
                if(x < 0){
                    x = -Math.min(cutImg.cutLength - 20,-x);
                }else {
                    x = Math.min(x,right,top*2,bottom*2);
                }
                if(x === 0) {
                    return;
                }
                cutImg.cutLength = cutImg.cutLength + x;
                cutImg.dom_cut.style.width = cutImg.cutLength + 'px';
                cutImg.dom_cut.style.height = cutImg.cutLength + 'px';
                cutImg.cutTop = cutImg.cutTop - x/2;
                cutImg.dom_cut.style.top = cutImg.cutTop + 'px';
                break;
            case 'rt':
                //最大范围
                if(x < 0){
                    x = -Math.min(cutImg.cutLength - 20,-x);
                }else {
                    x = Math.min(x,right,top);
                }
                if(x === 0) {
                    return;
                }
                cutImg.cutLength = cutImg.cutLength + x;
                cutImg.dom_cut.style.width = cutImg.cutLength + 'px';
                cutImg.dom_cut.style.height = cutImg.cutLength + 'px';
                cutImg.cutTop = cutImg.cutTop - x;
                cutImg.dom_cut.style.top = cutImg.cutTop + 'px';
                break;
            case 'rb':
                //最大范围
                if(x < 0){
                    x = -Math.min(cutImg.cutLength - 20,-x);
                }else {
                    x = Math.min(x,right,bottom);
                }
                if(x === 0) {
                    return;
                }
                cutImg.cutLength = cutImg.cutLength + x;
                cutImg.dom_cut.style.width = cutImg.cutLength + 'px';
                cutImg.dom_cut.style.height = cutImg.cutLength + 'px';
                break;
            case 't':
                //最大范围
                if(y > 0){
                    y = Math.min(cutImg.cutLength - 20,y);
                }else {
                    y = -Math.min(-y,top,left*2,right*2);
                }
                if(y === 0) {
                    return;
                }
                cutImg.cutLength = cutImg.cutLength - y;
                cutImg.dom_cut.style.width = cutImg.cutLength + 'px';
                cutImg.dom_cut.style.height = cutImg.cutLength + 'px';
                cutImg.cutTop = cutImg.cutTop + y;
                cutImg.dom_cut.style.top = cutImg.cutTop + 'px';
                cutImg.cutLeft = cutImg.cutLeft + y/2;
                cutImg.dom_cut.style.left = cutImg.cutLeft + 'px';
                break;
            case 'b':
                //最大范围
                if(y < 0){
                    y = -Math.min(cutImg.cutLength - 20,-y);
                }else {
                    y = Math.min(y,bottom,left*2,right*2);
                }
                if(y === 0) {
                    return;
                }
                cutImg.cutLength = cutImg.cutLength + y;
                cutImg.dom_cut.style.width = cutImg.cutLength + 'px';
                cutImg.dom_cut.style.height = cutImg.cutLength + 'px';
                cutImg.cutLeft = cutImg.cutLeft - y/2;
                cutImg.dom_cut.style.left = cutImg.cutLeft + 'px';
                break;
        }
        cutImg.clientX = e.clientX;
        cutImg.clientY = e.clientY;
        if(e.clientX < cutImg.xMin - 5) {
            cutImg.clientX = cutImg.xMin;
        }
        if(e.clientX > cutImg.xMax + 5) {
            cutImg.clientX = cutImg.xMax;
        }
        if(e.clientY < cutImg.yMin - 5) {
            cutImg.clientY = cutImg.yMin;
        }
        if(e.clientY > cutImg.yMax + 5) {
            cutImg.clientY = cutImg.yMax;
        }
        cutImg.imgShow();
    },
    //设置鼠标状态
    setCursor : function(str) {
        cutImg.dom_body.style.cursor = str;
        cutImg.dom_cut.style.cursor = str;
        document.querySelector('#cutbox div.cut em.l').style.cursor = str;
        document.querySelector('#cutbox div.cut em.lt').style.cursor = str;
        document.querySelector('#cutbox div.cut em.lb').style.cursor = str;
        document.querySelector('#cutbox div.cut em.r').style.cursor = str;
        document.querySelector('#cutbox div.cut em.rt').style.cursor = str;
        document.querySelector('#cutbox div.cut em.rb').style.cursor = str;
        document.querySelector('#cutbox div.cut em.t').style.cursor = str;
        document.querySelector('#cutbox div.cut em.b').style.cursor = str;
    },
    //内嵌展示
    imgShow : function() {
        cutImg.dom_cut_div.style.width = cutImg.cutLength + 'px';
        cutImg.dom_cut_div.style.height = cutImg.cutLength + 'px';
        cutImg.dom_cut_div_img.style.width = cutImg.boxWidth + 'px ';
        cutImg.dom_cut_div_img.style.height = cutImg.boxHeight + 'px';
        cutImg.dom_cut_div_img.style.marginTop = -(cutImg.cutTop-cutImg.boxTop) + 'px';
        cutImg.dom_cut_div_img.style.marginLeft = -(cutImg.cutLeft-cutImg.boxLeft) + 'px';
        if(cutImg.dom_cut_div_img.style.backgroundImage !== 'url("' + cutImg.dom_shade_img.src + '")') {
            cutImg.dom_cut_div_img.style.backgroundImage = 'url("' + cutImg.dom_shade_img.src + '")';
            cutImg.dom_cut_div_img.style.backgroundSize = 'contain';
        }
        cutImg.preview();
    },
    //预览
    preview : function() {
        var ratio;
        for(var i=0;i<cutImg.monitor.length;i++){
            ratio = cutImg.monitor[i].parentNode.clientWidth/cutImg.cutLength;
            cutImg.monitor[i].style.width = cutImg.boxWidth*ratio + 'px ';
            cutImg.monitor[i].style.height = cutImg.boxHeight*ratio + 'px';
            cutImg.monitor[i].style.marginTop = -(cutImg.cutTop-cutImg.boxTop)*ratio + 'px';
            cutImg.monitor[i].style.marginLeft = -(cutImg.cutLeft-cutImg.boxLeft)*ratio + 'px';
            if(cutImg.monitor[i].style.backgroundImage !== 'url("' + cutImg.dom_shade_img.src + '")') {
                cutImg.monitor[i].style.backgroundImage = 'url("' + cutImg.dom_shade_img.src + '")';
                cutImg.monitor[i].style.backgroundSize = 'contain';
            }
        }
    },
    //重置
    reset : function() {
        //清除默认图
        cutImg.dom_cutbox.style.background = 'none';
        for(var i=0;i<cutImg.monitor.length;i++){
            cutImg.monitor[i].parentNode.style.background = 'none';
        }
        //内置参数
        cutImg.imgWidth = 0;
        cutImg.imgHeight = 0;
        cutImg.showWidth = 0;
        cutImg.showHeight = 0;
        cutImg.boxWidth = 0;
        cutImg.boxHeight = 0;
        cutImg.imgZoom = 1;
        cutImg.boxTop = 0;
        cutImg.boxBottom = 0;
        cutImg.boxLeft = 0;
        cutImg.boxRight = 0;
        cutImg.cutTop = 0;
        cutImg.cutLeft = 0;
        cutImg.cutLength = 0;
        cutImg.zoomType = null;
        cutImg.xMax = null;
        cutImg.xMin = null;
        cutImg.yMax = null;
        cutImg.yMin = null;
        cutImg.clientX = null;
        cutImg.clientY = null;
        //缩放图片展示
        cutImg.dom_shade.style.width = '';
        cutImg.dom_shade.style.height = '';
        cutImg.dom_shade.style.top = '';
        cutImg.dom_shade.style.left = '';
        cutImg.dom_shade_img.style.width = '';
        cutImg.dom_shade_img.style.height = '';
        cutImg.dom_shade_img.style.visibility = '';
        //控制框展示
        cutImg.dom_cut.style.display = '';
        cutImg.dom_cut.style.top = '';
        cutImg.dom_cut.style.left = '';
        //缩放
        cutImg.dom_cut.style.width = '';
        cutImg.dom_cut.style.height = '';
        //预览
        cutImg.dom_cut_div.style.width = '';
        cutImg.dom_cut_div.style.height = '';
        cutImg.dom_cut_div_img.style.width = '';
        cutImg.dom_cut_div_img.style.height = '';
        cutImg.dom_cut_div_img.style.marginTop = '';
        cutImg.dom_cut_div_img.style.marginLeft = '';
        cutImg.dom_cut_div_img.style.backgroundImage = '';
        cutImg.dom_cut_div_img.style.backgroundSize = '';
        for(var i=0;i<cutImg.monitor.length;i++){
            cutImg.monitor[i].style.width = '';
            cutImg.monitor[i].style.height = '';
            cutImg.monitor[i].style.marginTop = '';
            cutImg.monitor[i].style.marginLeft = '';
            cutImg.monitor[i].style.backgroundImage = '';
            cutImg.monitor[i].style.backgroundSize = '';
        }
        cutImg.dom_cutbox.style.background = 'none';
        for(var i=0;i<cutImg.monitor.length;i++){
            cutImg.monitor[i].style.background = 'none';
        }
    }
};