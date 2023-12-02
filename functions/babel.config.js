module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "10" // or the current version of Node.js that Firebase Functions supports
        }
      }
    ]
  ]
};

