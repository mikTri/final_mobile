module.exports = function(api) {
  console.log('Loading Babel Configuration...');
  console.log('Babel cache status:', api.cache(true));
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          allowUndefined: false,
        },
      ],
    ],
  };
};
