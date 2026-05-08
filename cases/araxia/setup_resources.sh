#!/bin/bash
# Setup script: copies MRZ Scanner v4 bundle and DCV resources into static/dist/
# Run after `npm install` and before starting the server.
#
# Usage:
#   npm install
#   bash setup_resources.sh

set -e

SCRIPT_DIR="$(dirname "$0")"
NODE_MODULES="$SCRIPT_DIR/node_modules"
DEST="$SCRIPT_DIR/static/dist"

if [ ! -d "$NODE_MODULES/dynamsoft-mrz-scanner" ]; then
  echo "Error: node_modules not found. Run 'npm install' first."
  exit 1
fi

mkdir -p "$DEST"
echo "Copying MRZ Scanner bundle and resources to $DEST ..."

MRZ_DIST="$NODE_MODULES/dynamsoft-mrz-scanner/dist"

# 1. MRZ Scanner bundle (IIFE - standalone)
cp "$MRZ_DIST/mrz-scanner.bundle.js" "$DEST/"

# 2. MRZ Scanner config files
cp "$MRZ_DIST/mrz-scanner.template.json" "$DEST/"
if [ -f "$MRZ_DIST/mrz-scanner.ui.xml" ]; then
  cp "$MRZ_DIST/mrz-scanner.ui.xml" "$DEST/"
fi

# 3. DCV engine resources (WASM, workers)
mkdir -p "$DEST/dynamsoft-capture-vision-bundle/dist"
cp "$NODE_MODULES/dynamsoft-capture-vision-bundle/dist/"* \
   "$DEST/dynamsoft-capture-vision-bundle/dist/" 2>/dev/null || true

# 4. DCV data resources (models, parser specs, templates)
mkdir -p "$DEST/dynamsoft-capture-vision-data"
cp -r "$NODE_MODULES/dynamsoft-capture-vision-data/"* \
   "$DEST/dynamsoft-capture-vision-data/" 2>/dev/null || true

echo "Done! Resources copied to $DEST"
ls -la "$DEST"
