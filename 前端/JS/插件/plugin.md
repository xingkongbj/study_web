# 插件

## Bootstrap

### Bootstrap Typeahead

引入

    <link href="bootstrap.min.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery-1.8.3.min.js"></script>
    <script src="js/bootstrap-typeahead.js"></script>
    <input id="product_search" type="text" data-provide="typeahead" autocomplete="off" data-source='["Deluxe Bicycle", "Super Deluxe Trampoline", "Super Duper Scooter"]'>
     
脚本

    // 使用脚本填充数据
    $('#product_search').typeahead({
        source: function(query, process) {
            return ["Deluxe Bicycle", "Super Deluxe Trampoline", "Super Duper Scooter"];
        }
    });
    
    // 支持 Ajax 获取数据
    // query 输入的字符串
    // process 响应数据的函数
    $('#product_search').typeahead({
        source: function (query, process) {
            var parameter = {query: query};
            $.post('@Url.Action("AjaxService")', parameter, function (data) {
                process(data);
            });
        }
    });
    
### Popover

引入

    // data-toggle="popover"
    // data-container="body" 在body上设置弹出框，防止弹出框被遮盖
    // data-placement="top" 显示位置  top|bottom|left|right|auto
    // data-content 显示内容
    // data-trigger="focus" 什么事件触发显示 click| hover | focus | manual
    // data-original-title="提示" 提示框标题
    <button type="button" class="btn btn-primary" title="Popover title"
            data-container="body" data-toggle="popover" data-placement="top"
            data-trigger="focus"
            data-content="顶部的 Popover 中的一些内容">
        顶部的 Popover
    </button>
    
脚本

    $(".popover_target").popover();