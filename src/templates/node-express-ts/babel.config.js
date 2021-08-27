module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@views': './src/views',
          '@errors': './src/errors',
        },
      },
    ],
    '@babel/plugin-proposal-class-properties',
  ],
  ignore: ['**/*.spec.ts', '**/*.test.ts'],
};
