#!/bin/sh
set -e
printf "Loading nginx conf file ... "
cp -f "/app/etc/nginx/nginx.conf" "/etc/nginx/conf.d/default.conf"
echo "Done"
exec "$@"
