// Fills the page from src/config/site.js
const $ = (id) => document.getElementById(id);

export function renderSite(SITE) {
  document.title = SITE.name;
  $('logo').alt = SITE.name;
  $('tagline').textContent = SITE.tagline;
  $('foot').textContent = SITE.footer;

  const r = SITE.release;
  if (r) {
    $('release').hidden = false;
    $('rTitle').textContent = r.title;
    $('rMeta').textContent = r.type + ', ' + r.date;
    $('rListen').href = r.listenUrl;

    const img = $('cover');
    img.alt = 'Cover art for ' + r.title;
    img.src = r.cover;
    img.onerror = () => { img.removeAttribute('src'); img.alt = ''; };

    if (r.presaveUrl) {
      $('rPresave').href = r.presaveUrl;
      $('rPresave').hidden = false;
    }

    if (r.buyUrl) {
      const buy = document.createElement('a');
      buy.className = 'btn buy';
      buy.href = r.buyUrl;
      buy.target = '_blank';
      buy.rel = 'noopener';
      buy.textContent = r.buyLabel || 'Buy and download';
      $('release').appendChild(buy);
    }
  }

  SITE.links.forEach((l) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'link';
    a.href = l.url;
    a.textContent = l.label;
    if (!l.url.startsWith('mailto:')) { a.target = '_blank'; a.rel = 'noopener'; }
    li.appendChild(a);
    $('links').appendChild(li);
  });
}
