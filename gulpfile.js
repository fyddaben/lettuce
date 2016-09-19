var static = require('node-static');

// Create a node-static server instance to serve the './public' folder


//var aglio = require('aglio');
//
//// Render a blueprint with a template by name
//var options = {
//};
//var fs = require('fs');
//var iconv = require('iconv-lite');
//var file = "./dist/index.html";
//var _src = "./views/ppa.md";
//
//fs.readFile(_src, function(err, data){
//    if(err) {
//        console.log("读取文件fail " + err);
//    }else{
//        var str = iconv.decode(data, 'utf-8');
//
//        // 读取成功时
//        // 输出字节数组
//        aglio.render(str, options, function (err, html, warnings) {
//            fs.writeFile(file, html, function(err){
//                if(err) {
//                    console.log("fail " + err);
//                } else {
//                    console.log("写入文件ok");
//                }
//            });
//        });
//    }
//});
var gulp = require('gulp');
var aglio = require('gulp-aglio');

var dist_dir = './dist';

gulp.task('aglio', function() {
  gulp.src('./views/*.md')
        .pipe(aglio({
            themeTemplate: './template/index.jade',
            themeFullWidth: true,
            themeVariables: 'Streak'
        }))
        .pipe(gulp.dest(dist_dir));
});

gulp.task('watch', function () {

    gulp.watch('./views/*.md', ['aglio']);

});
gulp.task('default', ['aglio','watch']);

var file = new static.Server('./dist');
require('http').createServer(function (request, response) {
  console.log('http://127.0.0.1:8080');
  request.addListener('end', function () {
    file.serve(request, response);
  }).resume();
}).listen(8080);


