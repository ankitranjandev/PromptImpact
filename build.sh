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
cp privacy-policy.md "$BUILD_DIR/"

# Validate manifest.json
echo "✅ Validating manifest.json..."
if ! python3 -c "import json; json.load(open('$BUILD_DIR/manifest.json'))" 2>/dev/null; then
    echo "❌ Invalid manifest.json"
    exit 1
fi

# Copy icons directory
if [ -d "icons" ]; then
    echo "📁 Copying icons..."
    cp -r icons "$BUILD_DIR/"
    
    # Verify required PNG icons exist
    if [ -f "$BUILD_DIR/icons/icon16.png" ] && [ -f "$BUILD_DIR/icons/icon48.png" ] && [ -f "$BUILD_DIR/icons/icon128.png" ]; then
        echo "✅ All required PNG icons found"
    else
        echo "⚠️ Warning: Missing some required PNG icons (16, 48, 128px)"
        echo "   Please ensure you have icon16.png, icon48.png, and icon128.png"
    fi
else
    echo "❌ Icons directory not found!"
    exit 1
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
