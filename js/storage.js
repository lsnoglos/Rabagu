const StorageService = (() => {
  const keys = {users:'rabagu_users',products:'rabagu_products',orders:'rabagu_orders',cart:'rabagu_cart',notifications:'rabagu_notifications',audit:'rabagu_audit_logs',favorites:'rabagu_favorites',session:'rabagu_session',payments:'rabagu_payments',settings:'rabagu_settings'};
  const read = (key, fallback) => JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const get = (name, fallback=[]) => read(keys[name], fallback);
  const save = (name, value) => write(keys[name], value);
  const initializeRabaguData = () => {
    if (!localStorage.getItem(keys.users)) write(keys.users, RabaguData.users);
    if (!localStorage.getItem(keys.products)) write(keys.products, RabaguData.products);
    ['orders','notifications','audit','payments'].forEach(k => { if (!localStorage.getItem(keys[k])) write(keys[k], []); });
    if (!localStorage.getItem(keys.cart)) write(keys.cart, {});
    if (!localStorage.getItem(keys.favorites)) write(keys.favorites, {});
    if (!localStorage.getItem(keys.settings)) write(keys.settings, {version:'1.0.0',initializedAt:new Date().toISOString()});
  };
  const resetDemoData = () => { Object.values(keys).forEach(k => localStorage.removeItem(k)); initializeRabaguData(); };
  const generateId = (prefix, collection, pad=3) => `${prefix}-${String((collection||[]).reduce((m,i)=>Math.max(m, Number(String(i.id||'').split('-')[1])||0),0)+1).padStart(pad,'0')}`;
  return {keys, initializeRabaguData, resetDemoData, generateId,
    getUsers:()=>get('users'),saveUsers:v=>save('users',v),getProducts:()=>get('products'),saveProducts:v=>save('products',v),getOrders:()=>get('orders'),saveOrders:v=>save('orders',v),getCart:()=>get('cart',{}),saveCart:v=>save('cart',v),getNotifications:()=>get('notifications'),saveNotifications:v=>save('notifications',v),getAuditLogs:()=>get('audit'),saveAuditLogs:v=>save('audit',v),getFavorites:()=>get('favorites',{}),saveFavorites:v=>save('favorites',v),getSession:()=>read(keys.session,null),saveSession:v=>write(keys.session,v),clearSession:()=>localStorage.removeItem(keys.session),getPayments:()=>get('payments'),savePayments:v=>save('payments',v)};
})();
function initializeRabaguData(){ StorageService.initializeRabaguData(); }
