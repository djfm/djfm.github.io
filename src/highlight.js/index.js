/* eslint-disable @typescript-eslint/no-var-requires */

const hljs = require('../../node_modules/highlight.js/lib/core');

hljs.registerLanguage('bash', require('../../node_modules/highlight.js/lib/languages/bash'));
hljs.registerLanguage('cpp', require('../../node_modules/highlight.js/lib/languages/cpp'));
hljs.registerLanguage('css', require('../../node_modules/highlight.js/lib/languages/css'));
hljs.registerLanguage('javascript', require('../../node_modules/highlight.js/lib/languages/javascript'));
hljs.registerLanguage('json', require('../../node_modules/highlight.js/lib/languages/json'));
hljs.registerLanguage('typescript', require('../../node_modules/highlight.js/lib/languages/typescript'));

module.exports = hljs;
