# Rabagu

Rabagu es una primera versión funcional de un marketplace para conectar a mujeres emprendedoras, especialmente de comunidades rurales e indígenas, con compradores de todo el país.

**Eslogan:** “Nosotras las mujeres trabajamos la tierra”.

## Tecnologías

- HTML5
- CSS3
- JavaScript ES6+ vanilla
- LocalStorage como persistencia simulada

No utiliza backend, frameworks ni base de datos externa.

## Ejecutar

Puedes abrir `index.html` con un servidor local o publicarlo en GitHub Pages. Ejemplo:

```bash
python3 -m http.server 8000
```

Luego visita `http://localhost:8000`.

## Usuarios de prueba

| Usuario | Contraseña | Rol |
| --- | --- | --- |
| admin | 1234 | Administrador Rabagu |
| user1 | 1234 | Carmen Ruiz, emprendedora/compradora |
| user2 | 1234 | Lucía Mendoza, emprendedora/compradora |
| auditor | 1234 | Auditor Rabagu |

## Roles

- **Admin:** consulta usuarios, productos, compras, bitácora, estadísticas básicas; cambia roles y activa/desactiva usuarios sin dejar el sistema sin administradores.
- **User:** explora el catálogo, publica productos, compra, administra carrito, favoritos, perfil, compras, ventas, notificaciones y respuestas de entrega.
- **Auditor:** consulta órdenes, pagos simulados, comunicaciones y trazabilidad cronológica; puede marcar órdenes como `EN_REVISION`.

## Persistencia

La app usa claves versionadas en LocalStorage como `rabagu_users`, `rabagu_products`, `rabagu_orders`, `rabagu_cart`, `rabagu_notifications`, `rabagu_audit_logs`, `rabagu_favorites`, `rabagu_session`, `rabagu_payments` y `rabagu_settings`.

## Arquitectura

La persistencia está centralizada en `StorageService`, preparado para sustituirse después por una API REST sin reescribir toda la interfaz. La lógica se separa en servicios: `AuthService`, `UserService`, `ProductService`, `CartService`, `OrderService`, `PaymentService`, `NotificationService` y `AuditService`.

## Datos de demostración

`initializeRabaguData()` carga automáticamente cuatro usuarios, categorías y ocho productos iniciales si no existen datos previos. El administrador puede reiniciar los datos demo desde su dashboard.

## Flujo demostrable

La aplicación permite probar registro, login, catálogo, búsqueda, filtros, favoritos, carrito, pago simulado, órdenes por vendedor, notificaciones al vendedor, respuesta de entrega, notificación al comprador, historial de compras/ventas, panel admin, panel auditor, trazabilidad y bitácora.

## Advertencia

> Esta versión utiliza LocalStorage exclusivamente para fines demostrativos. No debe utilizarse en producción para almacenar información personal, credenciales reales o información financiera.

Los datos de cédula, contraseñas y pagos son simulados; el CVV y el número completo de tarjeta no se guardan.
