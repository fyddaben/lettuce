var static = require('node-static');
var drakov = require('drakovNew');

// Create a node-static server instance to serve the './public' folder

var gulp = require('gulp');
var aglio = require('gulp-aglio');

var dist_dir = './dist';
var md_dir = '../Cattle/views/*.md';

gulp.task('aglio', function() {
  gulp.src(md_dir)
      .pipe(aglio({
        themeTemplate: './template/index.jade',
        themeFullWidth: true
      }))
      .pipe(gulp.dest(dist_dir));
});
gulp.task('reMock', function() {
  drakov.stop(function() {
    console.log('stop mock server port ' + mockPort);
    drakov.run(argv, function(){
      console.log('re run mock server port ' + mockPort);
    });
  });
});

gulp.task('watch', function () {
  gulp.watch(md_dir, ['aglio', 'reMock']);
});

gulp.task('default', ['aglio','watch']);

var file = new static.Server('./dist');
var staticPort = 3001;
var mockPort = 3000;
require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response);
  }).resume();
}).listen(staticPort);

var argv = {
    sourceFiles: md_dir,
    serverPort: mockPort,
    pubilc: true,
    stealthmode: true
};

console.log('run static server port ' + staticPort);

drakov.run(argv, function(){
  console.log('run mock server port  ' + mockPort);
});





