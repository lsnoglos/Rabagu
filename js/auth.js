const UserService = (() => {
  const all = () => StorageService.getUsers();
  const find = id => all().find(u=>u.id===id);
  const byUsername = username => all().find(u=>u.username.toLowerCase()===username.toLowerCase());
  const save = user => { const users=all(); const i=users.findIndex(u=>u.id===user.id); i>=0?users.splice(i,1,user):users.push(user); StorageService.saveUsers(users); };
  const updateRole = (adminId, userId, role) => { const users=all(); const u=users.find(x=>x.id===userId); if(!u) throw Error('Usuario no encontrado'); if(u.role==='admin'&&role!=='admin'&&users.filter(x=>x.role==='admin'&&x.active&&x.id!==userId).length===0) throw Error('Debe existir al menos un administrador activo.'); u.role=role; StorageService.saveUsers(users); AuditService.log({userId:adminId,action:'USER_ROLE_CHANGED',module:'ADMIN',entityType:'USER',entityId:userId,description:`Rol de ${u.username} cambiado a ${role}`}); };
  const setActive = (adminId, userId, active) => { const users=all(); const u=users.find(x=>x.id===userId); if(u.role==='admin'&&!active&&users.filter(x=>x.role==='admin'&&x.active&&x.id!==userId).length===0) throw Error('Debe existir al menos un administrador activo.'); u.active=active; StorageService.saveUsers(users); AuditService.log({userId:adminId,action:active?'USER_ENABLED':'USER_DISABLED',module:'ADMIN',entityType:'USER',entityId:userId,description:`Usuario ${u.username} ${active?'activado':'desactivado'}`}); };
  return {all, find, byUsername, save, updateRole, setActive};
})();
const AuthService = (() => {
  const login = (username,password) => { const u=UserService.byUsername(username); if(!u||u.password!==password||!u.active){ AuditService.log({action:'LOGIN_FAILED',module:'AUTH',entityType:'USER',entityId:username,description:`Intento fallido para ${username}`}); throw Error('Usuario o contraseña incorrectos.'); } const s={userId:u.id,username:u.username,role:u.role,loginAt:new Date().toISOString()}; StorageService.saveSession(s); AuditService.log({userId:u.id,action:'LOGIN',module:'AUTH',entityType:'USER',entityId:u.id,description:'El usuario inició sesión'}); return s; };
  const register = data => { if(UserService.byUsername(data.username)) throw Error('El nombre de usuario ya existe.'); const users=UserService.all(); const user={id:StorageService.generateId('USR',users), username:data.username, password:data.password, name:data.name, address:data.address, cedula:data.cedula, phone:data.phone, categories:data.categories||[], role:'user', active:true, createdAt:new Date().toISOString()}; users.push(user); StorageService.saveUsers(users); AuditService.log({userId:user.id,action:'REGISTER',module:'AUTH',entityType:'USER',entityId:user.id,description:`Nuevo usuario registrado: ${user.username}`}); return user; };
  const logout = () => { const s=StorageService.getSession(); if(s) AuditService.log({userId:s.userId,action:'LOGOUT',module:'AUTH',entityType:'USER',entityId:s.userId,description:'El usuario cerró sesión'}); StorageService.clearSession(); };
  const currentUser = () => { const s=StorageService.getSession(); return s && UserService.find(s.userId); };
  return {login, register, logout, currentUser};
})();
