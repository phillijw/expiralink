#!/bin/bash
set -e

case "$1" in
"start" )
  npm start
  ;;
*)
  exec "$@"
  ;;
esac
