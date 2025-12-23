const fs = require('fs');
const path = require('path');

const talksData = fs.readFileSync(path.join(__dirname, 'talks.json'), 'utf8');
const style = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
const script = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

html = html.replace('<style>/* CSS will be injected here by the build script */</style>', `<style>${style}</style>`);
html = html.replace('<script>// Talk data will be injected here by the build script</script>', `<script>window.talksData = ${talksData};</script>`);
html = html.replace('<script>// Main script will be injected here by the build script</script>', `<script>${script}</script>`);

fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html);

console.log('Successfully built event-website/dist/index.html');
