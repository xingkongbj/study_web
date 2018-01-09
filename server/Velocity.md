# Velocity教程 #

注：对象的方法继承Java，velocity中大小写敏感。

## 1."#"用来标识Velocity的脚本语句 ##

 #set、#if 、#else、#end、#foreach、#end、#iinclude、#parse、#macro等
如：

    #if($info.imgs)
    <img src="$info.imgs" border=0>
    #else
    <img src="noPhoto.jpg">
    #end

## 2."$"用来标识一个对象(或理解为变量) ##

$i、$msg、$TagUtil.options(...)等。

    #if($info.imgs)
    <img src="$info.imgs" border=0>
    #else
    <img src="noPhoto.jpg">
    #end

## 3."{}"用来明确标识Velocity变量 ##

页面中有一个$someonename，此时，Velocity将把someonename作为变量名，若我们程序是想在someone这 个变量的后面紧接着显示name字符，则上面的标签应该改成${someone}name。

    ${someone}name

## 4."!"用来强制把不存在的变量显示为空白 ##

如当页面中包含$msg，如果msg对象有值，将显示msg的值，如果不存在msg对象同，则在页面中将显示$msg字符。这是我们不希望的，为了把不存 在的变量或变量值为null的对象显示为空白，则只需要在变量名前加一个“!”号即可。

    $!msg
    $!{msg}

## 5.判断语句 ##

条件成功，显示里面的代码。

    #if($msg)
    <script>
    alert('$!msg');
    </script>
    #elseif($msg2)
    <script>
    alert('$!msg2');
    </script>
    #else
    <script>
    alert('');
    </script>
    #end

## 6.循环 ##

    #foreach( $product in $allProducts )
    <li>$product</li>
    #end

    #foreach( $key in $allProducts.keySet() )
    <li>Key: $key -> Value: $allProducts.get($key)</li>
    #end

    #foreach( $customer in $customerList )
    <tr><td>$velocityCount</td><td>$customer.Name</td></tr>
    #end

## 7.脚本函数(宏)调用，不推荐在界面模板中大量使用 ##

宏相当于函数，调用如下头衔#orderPic("title")，头衔后面插入图片。

    #macro(orderPic $type)
    #if ($orderField.equals($type))
    <img src=/uploadfile/2016/0422/20160422045403837.gif">
    #end
    #end

## 8.包含文件#inclue("模板文件名")或#parse("模板文件名") ##

parse与include的区别在于，若包含的文件中有Velocity脚本标签，将会进一步解析，而include将原样显示。

    #parse("/blog/top.html")
    #parse("me.vm" )

或

    #include("/blog/top.html")
    #include( "one.gif","two.txt","three.htm" )

## 9.声明:#set ##

如果上述例子中的右值是null, 则左值不会被赋值，也就是说会保留以前的值。
velocity模板中未被定义的变量将被认为是一个字符串。

    #set( $monkey = $bill ) ## 变量引用
    #set( $monkey.Friend = "monica" ) ## 字符串
    #set( $monkey.Blame = $whitehouse.Leak ) ## 属性引用
    #set( $monkey.Plan = $spindoctor.weave($web) ) ## 方法引用
    #set( $monkey.Number = 123 ) ## 数字
    #set( $monkey.Say = ["Not", $my, "fault"] ) ## 数组

velocity模板中不会将reference解释为对象的实例变量。例如：$foo.Name将被解释为Foo对象的getName（）方法，而不是Foo对象的Name实例变量。

    $foo.getBar()  等同于 $foo.Bar ；
    $data.getUser("jon") 等同于 $data.User("jon") ；
    data.getRequest().getServerName() 等同于 $data.Request.ServerName等同于${data.Request.ServerName}

## 10.注释 ##

    单行## XXX
    多行#* xxx
    xxxx
    xxxxxxxxxxxx*#

## 11.变量 ##

以 "$" 开头，第一个字符必须为字母。
变量可以包含的字符有以下内容：
alphabetic (a .. z, A .. Z)
numeric (0 .. 9)
hyphen ("-")
underscore ("_")

## 12.属性 ##

    $Identifier.Identifier
    $user.name
    user.get("name")

## 13.方法 ##

    object user.getName() = $user.getName()

## 14.双引号 与 引号 ##

可以通过设置 stringliterals.interpolate=false改变默认处理方式。

    #set ($var="helo")
    test"$var" 返回testhello
    test'$var' 返回test'$var'

## 15.velocityCount变量在配置文件中定义 ##

Default name of the loop counter
variable reference.

    directive.foreach.counter.name = velocityCount

Default starting value of the loop
counter variable reference.

    directive.foreach.counter.initial.value = 1

## 16.停止执行并返回 ##

    #stop

## 17.in 运算符 ##

    #foreach( $foo in [1..5] ) 

## 18.逻辑运算符 ##

    ==
    &&
    ||
    !

## 19.转义字符'\'的使用 ##

如果reference被定义，两个’\’意味着输出一个’\’，如果未被定义，刚按原样输出。如：

    #set($email = "foo" )

    $email
    \$email
    \\$email
    \\\$email

输出：

    foo
    $email
    \foo
    \$email

如果$email 未定义

    $email
    \$email
    \\$email
    \\\$email

输出：

    $email
    \$email
    \\$email
    \\$email            (前面三个斜线,这里两个)

## 20.内置对象 ##

Velocity内置了一些对象，在vm模版里可以直接调用，列举如下：
$request、$response、$session，另外，模板内还可以使用 $msg内的消息工具访问 Struts 的国际化资源，达到简便实现国际化的方法。