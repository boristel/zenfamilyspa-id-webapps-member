const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

// Find the project root - force it to be the current working directory
// which should be C:\zen-mobile when running from there
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../");

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// 3. Force Metro to resolve modules as if we are in the junction path
// This is crucial for the "UnableToResolveError" with absolute paths
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // If the module name starts with the real path (d:\...), replace it with the junction path (C:\zen-mobile)
  if (moduleName.toLowerCase().startsWith("d:\\ben\\zen\\__new ben source\\zen front end\\memberwebapps\\mobile")) {
     const relativePath = moduleName.substring("d:\\ben\\zen\\__new ben source\\zen front end\\memberwebapps\\mobile".length);
     return context.resolveRequest(context, "C:\\zen-mobile" + relativePath, platform);
  }
  // Standard resolution
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
