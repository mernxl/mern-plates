module.exports = env => {
  const fs = require('fs');
  const path = require('path');

  const RELEASE = env.release;

  const nodeModules = {};
  fs.readdirSync('./node_modules')
    .filter(x => ['.bin', 'common'].indexOf(x) === -1)
    .forEach(mod => (nodeModules[mod] = `commonjs ${mod}`));

  return {
    target: 'node',
    mode: RELEASE ? 'production' : 'development',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: [/node_modules/]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.ts'],
    },
    externals: nodeModules,
    output: {
      filename: 'index.js',
      path: path.join(__dirname, RELEASE ? 'dist' : 'dev'),
    },
  };
};
