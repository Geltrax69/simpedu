module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/googlee79f866864b1fffe.html");
  return {
    dir: { input: "src", output: "dist", includes: "_includes" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
