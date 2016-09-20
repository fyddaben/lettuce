var static = require('node-static');
var drakov = require('drakovNew');

// Create a node-static server instance to serve the './public' folder

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
gulp.task('reMock', function() {
  drakov.stop(function() {
    console.log('stop mock server port 3000');
    drakov.run(argv, function(){
      console.log('re run mock server port 3000');
    });
  });
});

gulp.task('watch', function () {
  gulp.watch('./views/*.md', ['aglio', 'reMock']);
});

gulp.task('default', ['aglio','watch']);

var file = new static.Server('./dist');
var staticPort = 8080;
var mockPort = 3000;
require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response);
  }).resume();
}).listen(staticPort);

var argv = {
    sourceFiles: './views/*.md',
    serverPort: mockPort,
    stealthmode: true
};

console.log('run static server port 8080');

drakov.run(argv, function(){
  console.log('run mock server port 3000');
});





