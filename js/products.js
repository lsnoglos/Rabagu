const ProductService = (() => {
  const all = () => StorageService.getProducts();
  const active = () => all().filter(p=>p.status==='Activo'&&p.stock>0);
  const find = id => all().find(p=>p.id===id);
  const seller = p => UserService.find(p.sellerId);
  const search = ({query='',category='Todas'}={}) => active().filter(p => { const s=seller(p); const hay=[p.name,p.description,p.category,s?.name,s?.username].join(' ').toLowerCase(); const okCat=category==='Todas'||!category||p.category.includes(category)||category.includes(p.category); return hay.includes(query.toLowerCase())&&okCat; });
  const save = (userId, product) => { const products=all(); if(product.id){ const i=products.findIndex(p=>p.id===product.id); products[i]={...products[i],...product,updatedAt:new Date().toISOString()}; AuditService.log({userId,action:'PRODUCT_UPDATE',module:'PRODUCTS',entityType:'PRODUCT',entityId:product.id,description:`Producto actualizado ${product.name}`}); } else { product.id=StorageService.generateId('PROD',products); product.createdAt=new Date().toISOString(); product.updatedAt=product.createdAt; products.push(product); AuditService.log({userId,action:'PRODUCT_CREATE',module:'PRODUCTS',entityType:'PRODUCT',entityId:product.id,description:`Producto creado ${product.name}`}); } StorageService.saveProducts(products); return product; };
  const deactivate = (userId,id) => { const p=find(id); if(p){p.status='Inactivo'; p.updatedAt=new Date().toISOString(); StorageService.saveProducts(all()); AuditService.log({userId,action:'PRODUCT_DELETE',module:'PRODUCTS',entityType:'PRODUCT',entityId:id,description:`Producto desactivado ${p.name}`});} };
  const view = (userId,id) => AuditService.log({userId,action:'PRODUCT_VIEW',module:'PRODUCTS',entityType:'PRODUCT',entityId:id,description:`Consultó producto ${id}`});
  return {all, active, find, seller, search, save, deactivate, view};
})();
