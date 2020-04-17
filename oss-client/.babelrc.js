module.exports = function(api) {
  api.cache.never();
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "usage",
          corejs: 3,
        },
      ],
    ],
    plugins: [
      ["@babel/plugin-transform-regenerator", {}, "regenerator for async"],
      ["@babel/plugin-proposal-class-properties", {}, "build class props"],
      ["@babel/plugin-proposal-optional-chaining", {}, "optional chaining"],
    ],
  };
};
