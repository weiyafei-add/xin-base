const getBabelConfig = (modules) => {
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          modules,
          targets: {
            browsers: ["last 2 versions", "ie >= 11"],
          },
        },
      ],
      "@babel/preset-react",
    ],
    plugins: [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-transform-spread",
      "@babel/plugin-transform-object-assign",
      "@babel/plugin-transform-template-literals",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-class-properties",
      ["@babel/plugin-proposal-decorators", { legacy: true }],
    ],
  };
};

module.exports = getBabelConfig;
