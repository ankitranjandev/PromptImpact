#!/bin/bash
# Script to create PNG icons from SVG (requires ImageMagick or similar)

echo "🎨 Creating PNG icons for Chrome extension..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Please install it or use an online converter."
    echo ""
    echo "📋 Alternative options:"
    echo "1. Install ImageMagick: brew install imagemagick (macOS) or apt-get install imagemagick (Ubuntu)"
    echo "2. Use online converter: https://cloudconvert.com/svg-to-png"
    echo "3. Use Figma, Adobe Illustrator, or similar design tool"
    echo ""
    echo "📐 Required sizes:"
    echo "   - 16x16 pixels → icons/icon16.png"
    echo "   - 48x48 pixels → icons/icon48.png" 
    echo "   - 128x128 pixels → icons/icon128.png"
    exit 1
fi

# Create icons directory if it doesn't exist
mkdir -p icons

# Check if source SVG exists
if [ ! -f "icons/icon.svg" ]; then
    echo "🎨 Creating default SVG icon..."
    cat > icons/icon.svg << 'EOF'
<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#27ae60;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2ecc71;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="20" fill="url(#grad)"/>
  <circle cx="64" cy="45" r="20" fill="white" opacity="0.9"/>
  <text x="64" y="52" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#2c3e50" text-anchor="middle">AI</text>
  <rect x="30" y="75" width="68" height="8" rx="4" fill="white" opacity="0.8"/>
  <rect x="30" y="90" width="45" height="6" rx="3" fill="white" opacity="0.6"/>
  <rect x="30" y="102" width="55" height="6" rx="3" fill="white" opacity="0.6"/>
</svg>
EOF
    echo "✅ Created default SVG icon"
fi

# Convert SVG to PNG in required sizes
echo "🔄 Converting SVG to PNG..."

convert icons/icon.svg -resize 16x16 -quality 100 icons/icon16.png
convert icons/icon.svg -resize 48x48 -quality 100 icons/icon48.png  
convert icons/icon.svg -resize 128x128 -quality 100 icons/icon128.png

# Verify files were created
if [ -f "icons/icon16.png" ] && [ -f "icons/icon48.png" ] && [ -f "icons/icon128.png" ]; then
    echo "✅ Icons created successfully!"
    echo "📁 Files created:"
    ls -la icons/*.png
else
    echo "❌ Failed to create one or more icons"
    exit 1
fi

echo ""
echo "🎉 Icon creation complete!"
echo "💡 Tip: You can customize the icon by editing icons/icon.svg and running this script again"