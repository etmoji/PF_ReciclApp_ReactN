const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Asegúrate de incluir `bin` como una extensión de recurso
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'bin'); // Evita duplicados
config.resolver.assetExts.push('bin');

module.exports = config;
