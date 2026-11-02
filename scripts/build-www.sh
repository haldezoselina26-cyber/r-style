#!/bin/sh
# Copies the web app into www/ for the iPhone app (Capacitor)
set -e
rm -rf www && mkdir -p www
mkdir -p www/promo && cp promo/intro.mp4 promo/tutorial.mp4 www/promo/ && cp index.html app.js v9.js v10.js i18n.js avatar3d.js style.css privacy.html terms.html legal.js manifest.json sw.js icon-*.png logo*.svg www/
echo "www ready"
