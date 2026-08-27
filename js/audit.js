const AuditService = (() => {
  const log = ({userId='SYSTEM', action, module, entityType='SYSTEM', entityId='', description}) => {
    const logs = StorageService.getAuditLogs();
    logs.push({id:StorageService.generateId('LOG', logs, 6), userId, action, module, entityType, entityId, description, timestamp:new Date().toISOString()});
    StorageService.saveAuditLogs(logs);
  };
  const all = () => StorageService.getAuditLogs().sort((a,b)=>a.timestamp.localeCompare(b.timestamp));
  const byEntity = id => all().filter(l => l.entityId===id || (l.description||'').includes(id));
  return {log, all, byEntity};
})();
