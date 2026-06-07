const path = require('path');

module.exports = {
  style: {
    postcss: {
      mode: 'extends',
      loaderOptions: (postcssLoaderOptions) => {
        postcssLoaderOptions.postcssOptions = {
          config: false,
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
          ],
        };
        return postcssLoaderOptions;
      },
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
    configure: (webpackConfig, { env, paths }) => {
      // Optimize production build
      if (env === 'production') {
        // Enable tree shaking
        webpackConfig.optimization.usedExports = true;
        
        // Split chunks for better caching
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
              name: 'react-vendor',
              chunks: 'all',
            },
          },
        };
      }
      
      // Add fallbacks for Node.js core modules (if needed)
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer/'),
      };
      
      return webpackConfig;
    },
  },
  jest: {
    configure: (jestConfig, { env, paths, resolve, rootDir }) => {
      jestConfig.moduleNameMapper = {
        ...jestConfig.moduleNameMapper,
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@assets/(.*)$': '<rootDir>/src/assets/$1',
        '^@styles/(.*)$': '<rootDir>/src/styles/$1',
      };
      return jestConfig;
    },
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  babel: {
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
    loaderOptions: (babelLoaderOptions) => {
      return babelLoaderOptions;
    },
  },
};
