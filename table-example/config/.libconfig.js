module.exports = {
  lib: ['src/packages/react-den-table'], // need babel files or dirs
  dontLib: [], // dont babel files or dirs
  copy: {
    'src/packages/react-den-table': '../src',
    'dist': '../lib',
    'dist/package.json': '../package.json',
  },
  delete: ['dist', '../lib/package.json'], // after copy builded, delete files
  package: {
    "main": "lib/index.js",
    "types": "src/index.d.ts",
    "dependencies": {
      "react": "^16.8.4",
      "memoize-one": "^5.0.0",
      "react-window": "^1.7.1"
    },
  },
  gitURL: 'github.com/ymzuiku/react-den-form',
};