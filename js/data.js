const RabaguData = (() => {
  const now = new Date().toISOString();
  const categories = ['Artesanías','Textiles','Cerámica','Madera','Bisutería y accesorios','Cuero','Alimentos y conservas','Repostería y panadería','Café y productos agrícolas','Plantas y semillas','Productos naturales','Cuidado personal','Perfumería','Cosmética artesanal','Decoración del hogar','Arte y pintura','Productos culturales','Productos indígenas','Ropa y calzado','Bolsos y mochilas','Regalos','Productos para el hogar','Otros'];
  const users = [
    {id:'USR-001',username:'admin',password:'1234',name:'Administrador Rabagu',address:'Managua',cedula:'SIM-ADMIN',phone:'8888-0001',categories:['Administración'],role:'admin',active:true,createdAt:now},
    {id:'USR-002',username:'user1',password:'1234',name:'Carmen Ruiz',address:'Matagalpa, Nicaragua',cedula:'SIM-001',phone:'8888-0002',categories:['Artesanías','Madera','Café y productos agrícolas'],role:'user',active:true,createdAt:now},
    {id:'USR-003',username:'user2',password:'1234',name:'Lucía Mendoza',address:'Masaya, Nicaragua',cedula:'SIM-002',phone:'8888-0003',categories:['Textiles','Cerámica','Productos naturales'],role:'user',active:true,createdAt:now},
    {id:'USR-004',username:'auditor',password:'1234',name:'Auditor Rabagu',address:'León',cedula:'SIM-AUD',phone:'8888-0004',categories:['Auditoría'],role:'auditor',active:true,createdAt:now}
  ];
  const products = [
    {id:'PROD-001',sellerId:'USR-002',name:'Jarrones de madera',description:'Jarrones tallados a mano con maderas recuperadas de la comunidad.',category:'Madera',price:400,stock:8,image:'img/rabagu_img_user_001.jpg',location:'Matagalpa',status:'Activo',createdAt:now,updatedAt:now},
    {id:'PROD-002',sellerId:'USR-002',name:'Tarros encurtidos',description:'Conservas artesanales de vegetales cosechados localmente.',category:'Alimentos y conservas',price:90,stock:20,image:'img/rabagu_img_user_002.jpg',location:'Matagalpa',status:'Activo',createdAt:now,updatedAt:now},
    {id:'PROD-003',sellerId:'USR-003',name:'Mochila tejida',description:'Mochila colorida tejida por artesanas con patrones tradicionales.',category:'Textiles',price:650,stock:5,image:'img/rabagu_img_user_003.jpg',location:'Masaya',status:'Activo',createdAt:now,updatedAt:now},
    {id:'PROD-004',sellerId:'USR-003',name:'Pulsera artesanal',description:'Pulseras de bisutería hechas a mano con cuentas locales.',category:'Bisutería y accesorios',price:180,stock:15,image:'img/rabagu_img_user_004.jpg',location:'Masaya',status:'Activo',createdAt:now,updatedAt:now},
    {id:'PROD-005',sellerId:'USR-003',name:'Taza de cerámica',description:'Taza de barro esmaltada con diseños inspirados en la cultura local.',category:'Cerámica',price:250,stock:10,image:'img/rabagu_img_user_005.jpg',location:'Masaya',status:'Activo',createdAt:now,updatedAt:now},
    {id:'PROD-006',sellerId:'USR-003',name:'Jabón natural',description:'Jabón artesanal con aceites naturales y aroma de flores.',category:'Cuidado personal',price:120,stock:24,image:'img/rabagu_img_user_006.jpg',location:'Masaya',status:'Activo',createdAt:now,updatedAt:now},
    {id:'PROD-007',sellerId:'USR-002',name:'Planta ornamental',description:'Planta cultivada en vivero familiar, ideal para decorar el hogar.',category:'Plantas y semillas',price:150,stock:12,image:'img/rabagu_img_user_007.jpg',location:'Matagalpa',status:'Activo',createdAt:now,updatedAt:now},
    {id:'PROD-008',sellerId:'USR-002',name:'Café artesanal',description:'Café tostado en pequeños lotes por productoras rurales.',category:'Café y productos agrícolas',price:300,stock:18,image:'img/rabagu_img_user_008.jpg',location:'Matagalpa',status:'Activo',createdAt:now,updatedAt:now}
  ];
  return { categories, users, products };
})();
