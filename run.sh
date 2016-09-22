SHELL_PATH=$(cd `dirname $0`; pwd)

build_local() {
 export STATIC_PORT=3000
 export MOCK_PORT=3001
 npm install && node_modules/gulp/bin/gulp.js
}
build_dev() {
 npm install && node_modules/gulp/bin/gulp.js aglio
}
cd $SHELL_PATH
MODE=${1:-"local"}
"build_${MODE}";

