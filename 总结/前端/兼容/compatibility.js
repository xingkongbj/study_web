var tmp = {
	i : null,
	ver : 'ie8',
	dot : '@',
	type : null,
	obj : document
};
for(tmp.i in tmp.obj){
    tmp.type = typeof(tmp.obj[tmp.i]);
    switch (tmp.type){
        case "function":
            console.info(tmp.i + tmp.dot + 'Function' + tmp.dot + tmp.ver);
            break;
        case "object":
            console.info(tmp.i + tmp.dot + 'Object' + tmp.dot + tmp.ver);
            break;
        default :
            console.info(tmp.i + tmp.dot + tmp.obj[tmp.i] + tmp.dot + tmp.ver);
            break;
    }
}
