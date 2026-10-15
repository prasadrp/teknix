const fs = require('fs');
const path = require('path');

['index.html', 'about.html', 'services.html', 'gallery.html', 'contact.html', 'downloads.html'].forEach(p => {
  const file = path.join(__dirname, 'old_site', p);
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let m;
  const imgs = [];
  while ((m = imgRegex.exec(content)) !== null) {
    imgs.push(m[1]);
  }
  console.log(p, 'images:', [...new Set(imgs)]);
});
