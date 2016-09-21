export STATIC_PORT=3000
export MOCK_PORT=3002
SHELL_PATH=$(cd `dirname $0`; pwd)
build_local() {
 node_modules/gulp/bin/gulp.js
}
build_dev() {
  node_modules/gulp/bin/gulp.js aglio
}
cd $SHELL_PATH
MODE=${1:-"local"}
"build_${MODE}";

