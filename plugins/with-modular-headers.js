const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

/**
 * Expo config plugin to add `use_modular_headers!` to Podfile
 * This is required for Firebase Swift pods to work as static libraries
 */
const withModularHeaders = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      
      if (fs.existsSync(podfilePath)) {
        let podfileContent = fs.readFileSync(podfilePath, 'utf-8');
        
        // Check if use_modular_headers! is already present
        if (!podfileContent.includes('use_modular_headers!')) {
          // Find the target block and add use_modular_headers! after use_expo_modules!
          podfileContent = podfileContent.replace(
            /(target\s+['"][^'"]+['"]\s+do\s*\n\s*use_expo_modules!)/,
            '$1\n  use_modular_headers!'
          );
          
          fs.writeFileSync(podfilePath, podfileContent, 'utf-8');
          console.log('✅ Added use_modular_headers! to Podfile');
        }
      }
      
      return config;
    },
  ]);
};

module.exports = withModularHeaders;
