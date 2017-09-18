$(function(){
    //聊天窗口操作
    {
        //总行数
        var total = 0;
        //是否锁定滚动 false 自动滚动 true 锁定--不自动滚动
        var scroll = false;
        //滚动按钮绑定
        $('a.scroll').click(function() {
            if (scroll){
                scroll = false;
                $(this).removeClass('lock');
            }else {
                scroll = true;
                $(this).addClass('lock');
            }
        });
        //清空聊天区所有内容
        function clearAll(){
            $('div.content').html('');
            total = 0;
        }
        //滚动条置底
        function state(time){
            if (scroll) return;
            setTimeout(function(){
                $('div.content')[0].scrollTop = $('div.content')[0].scrollHeight;
            },time);
        }
        //删除超出的行,定时执行  del(500,20)
        function del(time,number){
            setInterval(function(){
                var t = total - number;
                if(t > 0){
                    for(var i= 0;i<t;i++){
                        $('div.content div').first().detach();
                        total = total - 1;
                    }
                }
            },time);
        }
        //每2秒删除超过200的行
        del(200,2000);
    }
    //消息发送
    {
        //表情按钮绑定
        $('.face').click(function(){
            $('.emoji_box').toggle();
            $(this).toggleClass('act');
            setFocus();
        });
        //发送事件绑定
        $('#msg_content').keydown(function(e){
            //回车发送
            if(e.keyCode == 13){
                e.preventDefault();
                closeFace();
                send();
            }
        }).bind('focusout', function(){
            //失去焦点记录光标位置
            var sec = window.getSelection();
            sectionObj.anchorNode = sec.anchorNode;
            sectionObj.anchorOffset = sec.anchorOffset;
        });
        //粘贴处理
        $('#msg_content')[0].onpaste = function(e){
            if(e.clipboardData){
                var text = e.clipboardData.getData('Text');
                var number = $(this)[0].innerText.length + $(this)[0].childElementCount;
                if(text.length > 10){
                    text = text.substr(0, 10);
                    alert('粘贴内容过长，已截取前10字！');
                }
                //转换html 空格，大于号，小于号，连字符
                text = text.replace(/&/g, '&amp;').replace(/\s/g, '&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                $(this).insertAtCaret(text);
                e.preventDefault();
            }
        };
        //发送按钮绑定
        $('a.send').click(function() {
            closeFace();
            send();
        });
        //发送消息
        window.send = function() {
            //剔除回车和换行
            var message = $('#msg_content')[0].innerHTML.replace(/[\r\n]/ig,'').replace(/<br>/ig,'');
            //内容为空
            if (!message) {
                return;
            }
            //编码表情信息
            message = message.replace(/<img.*?data-id="(.*?)" data-sign="emoji"\/?>/ig, '$1');
            //转换字符串 空格，大于号，小于号，连字符
            message = message.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

            //转换html 空格，大于号，小于号，连字符
            message = message.replace(/&/g, '&amp;').replace(/\s/g, '&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            //解码表情信息
            message = message.replace(/(1\.[02]\.\d{1,3}\.)(?:png|gif)/ig,'<img src="' + emoji_path + '$1png"/>');

            //范围随机函数
            function round(min,max){
                return (Math.random()*(max - min + 1)|0) + min;
            }
            var name = ['哆啦A梦','大雄','静香'];

            var html = '';
            html += '<div class="line">'
                + '    <p class="tit"><span class="name">' + name[round(0,name.length-1)] + '<span class="heart"></span> ：</span>'
                + '    <span class="cont">' + message + '</span></p>'
                + '</div>';
            $('div.content').append(html);
            state(0);
            total = total + 1;
            $('#msg_content').html('');
        };
    }
    //表情
    {
        //表情相对路径
        var emoji_path = 'images/emoji/';
        //光标位置记录
        window.sectionObj = {
            anchorNode : document.getElementById('msg_content'),
            anchorOffset : 0
        };
        //插入表情图片
        var msg = '';
        for(var em in emoji){
            msg += '<li><img class="emoji" src="'+ emoji_path + emoji[em].png +'" data-id="'+ emoji[em].id +'" data-gif="' + emoji_path + emoji[em].gif + '" data-png="' + emoji_path + emoji[em].png + '" title="'+ emoji[em].tip +'"></li>'
        }
        $('#emoji_list').html(msg);
        //表情事件绑定
        $('#emoji_list').on('click','li',function(){
            //插入表情
            closeFace();
            selectEmoji(this);
        });
        //关闭表情窗口
        function closeFace(){
            $('.emoji_box').hide();
            $('.face').removeClass('act');
        }
        //设置光标位置
        function setFocus(){
            var range = document.createRange();
            var pNode = document.getElementById('msg_content');
            if(sectionObj.anchorNode.nodeType == 1){
                //焦点在输入框
                range.setStart(pNode, sectionObj.anchorOffset);
                range.setEnd(pNode, sectionObj.anchorOffset);
            }else{
                //焦点在文本节点内部
                range.setStart(sectionObj.anchorNode,sectionObj.anchorOffset);
                range.setEnd(sectionObj.anchorNode,sectionObj.anchorOffset);
            }
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            $('#msg_content')[0].focus();
        }
        //插入表情
        function selectEmoji(ele){
            var img = $(ele).children('img')[0];
            var str = '<img src="' + img.dataset.png + '" data-id="' + img.dataset.id + '" data-sign="emoji"/>';
            $('#msg_content').insertAtCaret(str);
        }
        //向可编辑div里插入内容
        $.fn.extend({
            insertAtCaret: function (val) {
                //光标位置  光标在表情前面--上一个文本的结尾   光标在表情后面--输入框子节点的序号
                var selection = window.getSelection && window.getSelection();
                var anchorNode = selection.anchorNode;
                var anchorOffset = selection.anchorOffset;
                //输入框
                var pn = this[0];
                //选区
                var ran = selection.getRangeAt(0);
                //插入的表情
                var imgNode = $.parseHTML(val)[0];
                if (anchorNode.nodeType == 3) {
                    //文本中插入
                    if (selection.anchorOffset == anchorNode.nodeValue.length){
                        //在文本结尾
                        pn.insertBefore(imgNode ,anchorNode.nextElementSibling);
                    } else if (selection.anchorOffset == 0){
                        //在文本开头
                        pn.insertBefore(imgNode ,anchorNode);
                    } else {
                        //在文本中
                        //拆分后半部分文本并插入
                        var n2 = document.createTextNode(anchorNode.nodeValue.substring(selection.anchorOffset));
                        pn.replaceChild(n2, anchorNode);
                        //在后半部分文本前插入表情
                        imgNode = pn.insertBefore(imgNode, n2);
                        //插入前半部分文本
                        if(anchorOffset){
                            var n1 = document.createTextNode(anchorNode.nodeValue.substring(0, anchorOffset));
                            pn.insertBefore(n1, imgNode);
                        }
                    }
                }else if(anchorNode.nodeType == 1){
                    //输入框子节点插入
                    //在选中节点的后面一个节点，在它之前插入
                    pn.insertBefore(imgNode, pn.childNodes[anchorOffset]);
                }
                //结尾表情被隐藏处理176
                if (imgNode.offsetLeft - pn.scrollLeft > 176){
                    pn.scrollLeft = imgNode.offsetLeft - 176;
                }
                //设置焦点
                ran = ran.cloneRange();
                ran.setStartAfter(imgNode);
                selection.removeAllRanges();
                selection.addRange(ran);
                pn.focus();
            }
        });
    }
});