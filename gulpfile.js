var static = require('node-static');
var drakov = require('drakovNew');
var combiner = require('stream-combiner2');

// Create a node-static server instance to serve the './public' folder

var gulp = require('gulp');
var aglio = require('gulp-aglio');

var dist_dir = './dist';
var md_dir = './views/*.md';

gulp.task('aglio', function() {
    var combined = combiner.obj([
        gulp.src(md_dir),
        aglio({
          themeTemplate: './template/index.jade',
          themeFullWidth: true
        }),
        gulp.dest(dist_dir)
    ]);
    combined.on('error', function(e) {

    });
    return combined;
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

gulp.task('default', ['watch']);

var file = new static.Server('./dist');
var staticPort = process.env.STATIC_PORT;
var mockPort = process.env.MOCK_PORT;

require('http').createServer(function (request, response) {
  console.log('run static server port ' + staticPort);
  request.addListener('end', function () {
    file.serve(request, response);
  }).resume();
}).listen(staticPort);

var argv = {
    sourceFiles: md_dir,
    serverPort: mockPort,
    stealthmode: true,
    public: true
};

var d = require('domain').create();

d.on('error', function(err) {
    console.error('Error caught by domain:', err);
});
d.run(function() {
    drakov.run(argv, function(err){
        if (err) {
            throw err;
        }
        console.log('run mock server port  ' + mockPort);
    });
});

process.on('uncaughtException', function(err) {
    console.error('Error ben event:', err);
});
