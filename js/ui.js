const UI = (() => {
  const $ = s => document.querySelector(s);
  const escape = v => String(v ?? '').replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const money = n => `C$ ${Number(n||0).toLocaleString('es-NI')}`;
  const formatDate = iso => iso ? new Date(iso).toLocaleDateString('es-NI') : '';
  const formatTime = iso => iso ? new Date(iso).toLocaleTimeString('es-NI') : '';
  const formatDateTime = iso => `${formatDate(iso)} ${formatTime(iso)}`;
  const toast = (msg,type='success') => { const d=document.createElement('div'); d.className=`toast ${type}`; d.textContent=msg; $('#toast-root').append(d); setTimeout(()=>d.remove(),3500); };
  const modal = html => { $('#modal-root').innerHTML=`<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true"><button class="icon close-modal" aria-label="Cerrar">×</button>${html}</section></div>`; $('.close-modal').addEventListener('click', closeModal); };
  const closeModal = () => $('#modal-root').innerHTML='';
  const badge = s => `<span class="badge ${escape(s).toLowerCase()}">${escape(s)}</span>`;
  const empty = t => `<div class="empty">${escape(t)}</div>`;
  const formData = form => Object.fromEntries(new FormData(form).entries());
  const productCard = (p,u,fav=false) => `<article class="card product"><img src="${p.image}" alt="${escape(p.name)}"><button class="heart" data-action="fav" data-id="${p.id}">${fav?'♥':'♡'}</button><h3>${escape(p.name)}</h3><p>Por ${escape(u?.name||'')}</p><p class="muted">${escape(p.category)} · ${escape(p.location)}</p><strong class="price">${money(p.price)}</strong><div class="row"><button class="secondary" data-action="view-product" data-id="${p.id}">Ver producto</button><button data-action="add-cart" data-id="${p.id}">Agregar</button></div></article>`;
  window.formatDate=formatDate; window.formatTime=formatTime; window.formatDateTime=formatDateTime;
  return {$, escape, money, toast, modal, closeModal, badge, empty, formData, productCard, formatDate, formatTime, formatDateTime};
})();
