const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');

const pages = ['index.html', 'about.html', 'services.html', 'downloads.html', 'gallery.html', 'contact.html'];
pages.forEach(p => {
  if (!fs.existsSync(p)) return;
  const html = fs.readFileSync(p, 'utf8');
  const classMatches = html.matchAll(/class=["']([^"']+)["']/g);
  const missing = new Set();
  for (const m of classMatches) {
    const classes = m[1].split(/\s+/);
    classes.forEach(c => {
      c = c.trim();
      if (!c) return;
      const regex = new RegExp('\\.' + c + '(?![\\w-])');
      if (!regex.test(css)) {
        missing.add(c);
      }
    });
  }
  console.log(p, 'missing classes in CSS:', [...missing]);
});
