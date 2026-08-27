const CartService = (() => {
  const userCart = uid => StorageService.getCart()[uid] || [];
  const saveUserCart = (uid, items) => { const c=StorageService.getCart(); c[uid]=items; StorageService.saveCart(c); };
  const add = (uid, productId, qty=1) => { const p=ProductService.find(productId); if(!p||p.status!=='Activo') throw Error('Producto no disponible.'); const items=userCart(uid); const it=items.find(i=>i.productId===productId); const newQty=(it?.quantity||0)+qty; if(newQty>p.stock) throw Error('No puedes agregar una cantidad superior al inventario disponible.'); it?it.quantity=newQty:items.push({productId,sellerId:p.sellerId,quantity:qty,price:p.price}); saveUserCart(uid,items); AuditService.log({userId:uid,action:'CART_ADD',module:'CART',entityType:'PRODUCT',entityId:productId,description:`Agregó ${productId} al carrito`}); };
  const update = (uid, productId, qty) => { const p=ProductService.find(productId); if(qty>p.stock) throw Error('No puedes agregar una cantidad superior al inventario disponible.'); const items=userCart(uid).filter(i=>i.productId!==productId); if(qty>0) items.push({productId,sellerId:p.sellerId,quantity:qty,price:p.price}); saveUserCart(uid,items); AuditService.log({userId:uid,action:qty>0?'CART_UPDATE':'CART_REMOVE',module:'CART',entityType:'PRODUCT',entityId:productId,description:`Carrito actualizado ${productId}`}); };
  const clear = uid => saveUserCart(uid, []);
  const totals = uid => { const items=userCart(uid); const subtotal=items.reduce((s,i)=>s+i.price*i.quantity,0); return {items, subtotal, shipping:0, total:subtotal}; };
  return {userCart, add, update, clear, totals};
})();
