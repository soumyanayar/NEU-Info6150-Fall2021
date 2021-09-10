const path = require('path');
const parser = require('node-html-parser');
const fs = require('fs');

// Note: We're using JS here to make sure NodeJS is properly installed.
// This isn't very informative or representative of web development

const html = fs.readFileSync('./people.html', {encoding:'utf8', flag:'r'});
const root = parser.parse(html);

console.log(`Github id is: ${root.querySelector('.people .github').textContent}`);

