#!/bin/sh
# Copies the web app into www/ for the iPhone app (Capacitor)
set -e
rm -rf www && mkdir -p www
cp index.html app.js v9.js v10.js fx.js i18n.js avatar3d.js style.css manifest.json sw.js icon-*.png logo*.svg www/
echo "www ready"
