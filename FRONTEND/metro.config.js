const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Force Metro to avoid package "exports" resolution issues
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
