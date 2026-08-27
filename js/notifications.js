const NotificationService = (() => {
  const all = () => StorageService.getNotifications();
  const forUser = uid => all().filter(n=>n.recipientId===uid).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
  const unreadCount = uid => forUser(uid).filter(n=>!n.read).length;
  const create = ({recipientId,type,title,message,orderId,actorId}) => { const ns=all(); const n={id:StorageService.generateId('NOT',ns),recipientId,type,title,message,orderId,read:false,createdAt:new Date().toISOString()}; ns.push(n); StorageService.saveNotifications(ns); AuditService.log({userId:actorId||recipientId,action:'NOTIFICATION_CREATED',module:'NOTIFICATIONS',entityType:'ORDER',entityId:orderId,description:`Notificación enviada a ${recipientId}: ${title}`}); return n; };
  const markRead = (uid,id) => { const ns=all(); const n=ns.find(x=>x.id===id&&x.recipientId===uid); if(n&&!n.read){ n.read=true; StorageService.saveNotifications(ns); AuditService.log({userId:uid,action:'NOTIFICATION_VIEWED',module:'NOTIFICATIONS',entityType:'NOTIFICATION',entityId:id,description:`Notificación vista ${id}`}); } };
  const byOrder = id => all().filter(n=>n.orderId===id);
  return {all, forUser, unreadCount, create, markRead, byOrder};
})();
