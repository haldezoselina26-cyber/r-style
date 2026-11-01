#!/bin/sh
# Copies the web app into www/ for the iPhone app (Capacitor)
set -e
rm -rf www && mkdir -p www
cp index.html app.js v9.js v10.js i18n.js avatar3d.js style.css manifest.json sw.js icon-180.png icon-192.png icon-512.png www/
echo "www ready"
