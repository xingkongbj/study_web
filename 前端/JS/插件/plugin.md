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