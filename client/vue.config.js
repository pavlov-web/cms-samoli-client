const path = require("path");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@ui": path.resolve(__dirname, "src/components/ui"),
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "src/assets/scss/theme.scss";
        `,
      },
    },
  },
};
