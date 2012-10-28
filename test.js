var gh = require('./index')

gh("test", {remote:"git@github.com:communities/test23ds.git", readme: "xx", license: "asd"}, function(err){
	console.log("xxx",err);
})