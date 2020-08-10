// postcss.config.js
const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: ['src/*.html'],
  // This is the function used to extract class names from your templates
  defaultExtractor: (content) => {
      // Capture as liberally as possible, including things like `h-(screen-1.5)`
      const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

      // Capture classes within other delimiters like .block(class="w-1/2") in Pug
      const innerMatches =
          content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
      return broadMatches.concat(innerMatches);
  },
});

const isProduction = process.env.NODE_ENV === 'production';
const tailwindcss = require('tailwindcss')('./tailwind.config.js');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const simpleVars = require('postcss-simple-vars')({ silent: true });
const precss = require('precss');

// const plugins = [tailwindcss, autoprefixer, cssnano, purgecss];
const corePlugins = [precss, tailwindcss];
const plugins = isProduction ?
  [...corePlugins, autoprefixer, cssnano, purgecss] : corePlugins;

module.exports = {
  plugins
};