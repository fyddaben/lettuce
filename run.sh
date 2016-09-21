export STATIC_PORT=3000
export MOCK_PORT=3002

build_local() {
 node_modules/gulp/bin/gulp.js
}
build_dev() {
  node_modules/gulp/bin/gulp.js aglio
}

MODE=${1:-"local"}
"build_${MODE}";

