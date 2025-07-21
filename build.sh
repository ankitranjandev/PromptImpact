#!/bin/bash

# AI Impact Estimator Chrome Extension Build Script

echo "🔧 Building AI Impact Estimator Chrome Extension..."

# Create build directory
BUILD_DIR="build"
DIST_DIR="dist"
ZIP_NAME="ai-impact-estimator.zip"

# Clean previous builds
rm -rf "$BUILD_DIR" "$DIST_DIR" "$ZIP_NAME"

# Create build directory
mkdir -p "$BUILD_DIR"

echo "📁 Copying files..."

# Copy essential files
cp manifest.json "$BUILD_DIR/"
cp background.js "$BUILD_DIR/"
cp content.js "$BUILD_DIR/"
cp popup.html "$BUILD_DIR/"
cp popup.js "$BUILD_DIR/"
cp README.md "$BUILD_DIR/"

# Validate manifest.json
echo "✅ Validating manifest.json..."
if ! python3 -c "import json; json.load(open('$BUILD_DIR/manifest.json'))" 2>/dev/null; then
    echo "❌ Invalid manifest.json"
    exit 1
fi

# Create icons directory and add a simple icon (optional)
mkdir -p "$BUILD_DIR/icons"

# Create a simple SVG icon if none exists
if [ ! -f "$BUILD_DIR/icons/icon48.png" ]; then
    echo "🎨 Creating default icon..."
    # You can replace this with actual icon files
    echo '<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="#3498db"/><text x="24" y="30" font-family="Arial" font-size="16" fill="white" text-anchor="middle">AI</text></svg>' > "$BUILD_DIR/icons/icon.svg"
fi

# Update manifest to include icons if they exist
if [ -f "$BUILD_DIR/icons/icon.svg" ]; then
    echo "📝 Adding icon to manifest..."
    # Note: For a real icon, you'd want to convert SVG to PNG and update manifest
fi

echo "🗜️  Creating ZIP package..."

# Create distribution directory
mkdir -p "$DIST_DIR"

# Create ZIP file
cd "$BUILD_DIR"
zip -r "../$DIST_DIR/$ZIP_NAME" . -x "*.DS_Store" "*.git*"
cd ..

echo "✨ Build complete!"
echo "📦 Package created: $DIST_DIR/$ZIP_NAME"
echo ""
echo "🚀 To install:"
echo "   1. Open Chrome and go to chrome://extensions/"
echo "   2. Enable 'Developer mode'"
echo "   3. Click 'Load unpacked' and select the '$BUILD_DIR' folder"
echo ""
echo "📤 To publish:"
echo "   1. Upload '$DIST_DIR/$ZIP_NAME' to Chrome Web Store"
echo "   2. Fill out the store listing"
echo "   3. Submit for review"

# List files in build
echo ""
echo "📋 Build contents:"
ls -la "$BUILD_DIR"

echo ""
echo "🎉 Ready to test! Load the '$BUILD_DIR' folder as an unpacked extension."
