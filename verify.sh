#!/bin/bash

echo "🔍 AI Impact Estimator - Final Verification"
echo "=========================================="
echo ""

BUILD_DIR="build"
cd "$BUILD_DIR"

# Check file existence
echo "📁 Checking required files..."
required_files=("manifest.json" "background.js" "content.js" "popup.js" "popup.html" "icons/icon.svg")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (MISSING)"
        exit 1
    fi
done
echo ""

# Validate JSON files
echo "🔧 Validating JSON syntax..."
if python3 -c "import json; json.load(open('manifest.json'))" 2>/dev/null; then
    echo "✅ manifest.json syntax valid"
else
    echo "❌ manifest.json syntax invalid"
    exit 1
fi
echo ""

# Check JavaScript syntax
echo "📝 Validating JavaScript syntax..."
js_files=("background.js" "content.js" "popup.js")
for file in "${js_files[@]}"; do
    if node -c "$file" 2>/dev/null; then
        echo "✅ $file syntax valid"
    else
        echo "❌ $file syntax invalid"
        exit 1
    fi
done
echo ""

# Check file sizes
echo "📊 File sizes:"
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        size=$(wc -c < "$file" | tr -d ' ')
        echo "   $file: $size bytes"
    fi
done
echo ""

# Check manifest version and permissions
echo "🛡️  Manifest validation:"
manifest_version=$(python3 -c "import json; print(json.load(open('manifest.json'))['manifest_version'])")
echo "   Manifest version: $manifest_version"

permissions=$(python3 -c "import json; print(len(json.load(open('manifest.json'))['permissions']))")
echo "   Permissions count: $permissions"

host_permissions=$(python3 -c "import json; print(len(json.load(open('manifest.json'))['host_permissions']))")
echo "   Host permissions count: $host_permissions"

echo ""
echo "🎉 All checks passed! Extension is ready for installation."
echo ""
echo "🚀 Installation instructions:"
echo "   1. Open Chrome: chrome://extensions/"
echo "   2. Enable 'Developer mode'"
echo "   3. Click 'Load unpacked'"
echo "   4. Select this 'build' folder"
echo ""
echo "🧪 Test on these platforms:"
echo "   • https://chat.openai.com (ChatGPT)"
echo "   • https://claude.ai (Claude)"
echo "   • https://grok.x.ai (Grok)"
echo "   • https://gemini.google.com (Gemini)"
echo "   • https://perplexity.ai (Perplexity)"
echo "   • https://chat.mistral.ai (Mistral)"
echo "   • https://copilot.microsoft.com (Copilot)"
echo "   • https://poe.com (Poe)"
