const fs = require('fs');
const content = fs.readFileSync('scratch/old_site/index.html', 'utf8');

const secRegex = /<section[\s\S]*?<\/section>/gi;
let match;
let idx = 1;
while ((match = secRegex.exec(content)) !== null) {
  const sec = match[0];
  const imgs = [];
  const imgM = /<img[^>]+src=["']([^"']+)["']/gi;
  let im;
  while ((im = imgM.exec(sec)) !== null) imgs.push(im[1]);
  
  const text = sec.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                  .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                  .replace(/<!--[\s\S]*?-->/g, '')
                  .replace(/<[^>]+>/g, '\n')
                  .split('\n')
                  .map(l => l.trim())
                  .filter(l => l.length > 0);
                  
  console.log('=== SECTION ' + idx++ + ' ===');
  console.log('Images:', [...new Set(imgs)]);
  console.log('Text preview:', text.slice(0, 15).join(' | '));
}
