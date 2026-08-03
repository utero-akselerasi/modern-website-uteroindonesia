const fs = require('fs');
const path = require('path');

function fixPaths(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixPaths(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace absolute paths in HTML attributes
      content = content.replace(/href="\/_next\//g, 'href="./_next/');
      content = content.replace(/src="\/_next\//g, 'src="./_next/');
      content = content.replace(/href="\/images\//g, 'href="./images/');
      content = content.replace(/src="\/images\//g, 'src="./images/');
      
      // Replace absolute paths in JavaScript strings
      content = content.replace(/"\/_next\/static\//g, '"./_next/static/');
      content = content.replace(/"\/images\//g, '"./images/');
      content = content.replace(/'\/_next\/static\//g, '\'"./_next/static/');
      content = content.replace(/'\/images\//g, '\'"./images/');
      
      fs.writeFileSync(filePath, content);
      console.log(`Fixed: ${filePath}`);
    }
  });
}

console.log('Fixing paths in out/ directory...');
fixPaths('./out');
console.log('Done!');
