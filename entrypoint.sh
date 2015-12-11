#!/bin/bash
set -e

case "$1" in
"start" )
  set DEBUG=elweb:*
  npm start
  ;;
*)
  exec "$@"
  ;;
esac
