/* Decap content previews. The live site retains its own responsive layout. */
(() => {
  const {CMS, h} = window;
  if (!CMS || !h) return;
  CMS.registerPreviewStyle('/admin/preview.css');
  const toggle = document.createElement('button');
  toggle.className = 'cms-mobile-preview';
  toggle.type = 'button';
  toggle.textContent = 'Preview copy';
  toggle.setAttribute('aria-pressed', 'false');
  toggle.addEventListener('click', () => {
    const active = document.body.classList.toggle('cms-mobile-preview-active');
    toggle.textContent = active ? 'Edit copy' : 'Preview copy';
    toggle.setAttribute('aria-pressed', String(active));
  });
  document.body.appendChild(toggle);
  const note = () => h('p', {className:'preview-note'}, 'Copy preview · Publish saves your edits and starts the site update.');
  const frame = (...children) => h('main', {}, note(), ...children);
  const p = value => h('p', {}, value);
  const image = (src, alt, getAsset) => src ? h('img', {src:String(getAsset(src)),alt:alt || ''}) : null;
  const title = (value, tag='h2') => h(tag, {}, value);
  const replace = (value, values) => String(value || '').replace(/\{\{(\w+)\}\}/g,(token,key)=>key in values ? values[key] : token);
  CMS.registerPreviewTemplate('home', ({entry,getAsset}) => {
    const d = entry.get('data').toJS();
    return frame(p(d.eyebrow),title(d.title,'h1'),p(replace(d.intro,{recordCount:360})),p(`${d.archiveLink} · ${d.storyLink}`),p(d.recoveryNote),...(d.brandArtwork || []).map((x,i)=>h('figure',{key:i},image(x.src,x.alt,getAsset),p(x.label))),title(d.discoveriesTitle),
      ...(d.picks || []).map((x,i)=>h('section',{key:i},image(x.image?.src,x.image?.alt,getAsset),p(x.caption),p(x.date),title(x.artist),title(x.title,'h3'),p(x.description))),
      title(d.timelineTitle),...(d.timeline || []).map((x,i)=>h('section',{key:i},p(x.year),title(x.title,'h3'),p(x.copy))),title(d.vaultTitle),p(replace(d.vaultIntro,{imageCount:9})),p(d.vaultLink));
  });
  CMS.registerPreviewTemplate('discoveries', ({entry,getAsset}) => {
    const d=entry.get('data').toJS();
    return frame(p(d.eyebrow),title(d.title,'h1'),p(replace(d.intro,{count:d.entries?.length || 0})),...(d.entries || []).map(x=>h('section',{key:x.id},p(`${x.date} · ${x.brand}`),title(x.artist),title(x.title,'h3'),p(x.description),image(x.poster,x.listeningTitle,getAsset),p(x.mediaLabel),p(x.sourceNote),p(x.recordLabel || 'View record'))));
  });
  const storyOrder = {"header": ["title", "intro", "contentsTitle", "eyebrow", "foundersLabel", "eraLabel", "era"], "genesis": ["title", "bannerCaption", "intro", "nameOrigin", "platforms", "mottoCredit", "motto"], "grog": ["title", "intro", "arroyoLabel", "arroyoTitle", "arroyoQuote", "arroyoCredit", "liveLabel", "liveIntro", "liveContext", "mgkIntro", "mgkLabel", "mgkCaption", "mgkWatch", "liveLinkText", "mgkLinkText"], "surge": ["title", "readership", "mashups"], "rebrand": ["title", "bannerCaption", "intro", "design", "contributors", "contributorsTitle", "attributionNote"], "finale": ["title", "intro", "sale", "memories", "artists", "discoveriesLink", "archiveLink", "vaultLink"]};
  CMS.registerPreviewTemplate('story', ({entry,widgetsFor}) => {
    const d=entry.get('data').toJS();
    return frame(...['header','genesis','grog','surge','rebrand','finale'].map(name=>{
      const group=widgetsFor(name);
      const fields=d[name] || {};
      return h('section',{key:name},title(fields.title,name==='header'?'h1':'h2'),...storyOrder[name].filter(k=>k!=='title').map(k=>h('div',{key:k,className:'story-field'},group.getIn(['widgets',k]))));
    }));
  });
  CMS.registerPreviewTemplate('artwork', ({entry,getAsset}) => frame(title('Artwork captions','h1'),...(entry.getIn(['data','items'])?.toJS() || []).map(x=>h('section',{key:x.id},image(x.src,x.alt,getAsset),p(x.badge),title(x.title),p(x.description),p(`Image description: ${x.alt}`)))));
  CMS.registerPreviewTemplate('credits', ({entry}) => {
    const d=entry.get('data').toJS();
    return frame(title(d.footerTitle,'h1'),p(d.footerCredits),title('Founders'),p((d.founders || []).join(' & ')),title('Writers'),p((d.writers || []).join(', ')),p(d.openAttributionNote),p(d.colophonStaffNote));
  });
})();
