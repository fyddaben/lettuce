export STATIC_PORT=3000
export MOCK_PORT=3002

build_local() {
  gulp
}
build_dev() {
  gulp aglio
}

MODE=${1:-"local"}
"build_${MODE}";

