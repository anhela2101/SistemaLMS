# Medicina Critica LMS

Plataforma LMS para Medicina Critica con frontend en React y backend en Supabase. Este README funciona como guia viva del proyecto: alcance, decisiones tecnicas, pendientes y checklist de avance.

## Objetivo

Construir una plataforma LMS con:

- Frontend React para interfaz de usuario y panel administrativo.
- Supabase para Auth, Postgres, Storage y funciones.
- Brevo para correos transaccionales.
- Flow para pagos y confirmacion por webhook.
- Bunny.net para video, archivos y streaming.
- Deploy en Vercel.

## Stack obligatorio

- React + Vite.
- Supabase Auth para usuarios.
- Supabase Postgres para datos.
- Supabase Storage para archivos que no sean video.
- Supabase Edge Functions o Vercel Serverless Functions para webhooks, certificados y emails.
- Brevo para bienvenida, compra, certificado, reset y recordatorios.
- Flow para checkout, estados de pago y conciliacion por webhook.
- Bunny.net para videos y materiales pesados.
- Vercel para frontend y endpoints serverless si aplica.

## Checklist de avance

- [x] Proyecto frontend React + Vite identificado como SPA.
- [x] Dependencias instaladas.
- [x] Cambio de `@vitejs/plugin-react-swc` a `@vitejs/plugin-react`.
- [x] Cliente de Supabase creado en `src/lib/supabaseClient.js`.
- [x] Variables frontend de Supabase preparadas en `.env.local` y `.env.example`.
- [x] Login conectado a Supabase Auth con email/password.
- [x] Registro conectado a Supabase Auth con email/password.
- [x] Ruta protegida conectada a sesion real de Supabase.
- [x] Registro guarda datos extra en `user_metadata`: nombre, documento, pais, telefono, telefono internacional y aceptacion de terminos.
- [x] Validaciones basicas de registro: campos completos, email valido, password minimo 6 caracteres y terminos aceptados.
- [x] Migracion SQL preparada para crear `public.users` y sincronizar datos desde Supabase Auth.
- [x] Base serverless para correos transaccionales con Brevo en `api/emails/send-transactional.js`.
- [x] Variables de entorno para Brevo documentadas en `.env.example`.
- [x] SQL de sincronizacion para usuarios Auth ya existentes preparado en `supabase/sql/sync_existing_auth_users.sql`.
- [x] Navbar del dashboard muestra el nombre y rol del usuario autenticado desde `public.users`.
- [ ] Confirmar migracion `supabase/migrations/20260412000000_create_public_users.sql` aplicada en Supabase.
- [ ] Configurar plantilla de confirmacion de correo en Supabase.
- [ ] Configurar SMTP custom en Supabase con Brevo si se quiere que los emails de Auth salgan desde dominio propio.
- [ ] Crear roles Admin / Editor / Soporte.
- [ ] Crear esquema de cursos, modulos, lecciones, compras, progreso, examenes y certificados.
- [ ] Integrar Flow para checkout y webhook de confirmacion.
- [ ] Integrar Bunny.net para videos y materiales.
- [ ] Deploy en Vercel con variables de entorno de produccion.

## Backend Roadmap

### 1. Acceso y roles

- [x] Registro de usuarios en Supabase Auth.
- [x] Copia de datos de Auth a `public.users`.
- [x] Nombre y rol del usuario autenticado mostrados en el dashboard.
- [ ] Login de administradores.
- [ ] Roles minimos: Admin, Editor, Soporte y Student.
- [ ] Permisos por modulo: cursos, lecciones, examenes, usuarios, ventas, certificados, banners, ayuda y ajustes.
- [ ] RLS por rol para operaciones administrativas.

### 2. Dashboard administrativo

- [ ] KPIs: ventas del mes, nuevos alumnos, certificados emitidos y cursos activos.
- [ ] Tabla de ultimas transacciones.
- [ ] Tabla de usuarios recientes.
- [ ] Alertas de pagos fallidos o pendientes.
- [ ] Alertas de accesos por vencer, si aplica.
- [ ] Filtros por rango de fechas.

### 3. Cursos

- [ ] Tabla `courses`.
- [ ] Crear, editar, publicar y despublicar cursos.
- [ ] Campos: titulo, descripcion, imagen/thumbnail, tipo gratuito/pago, precio, duracion de acceso y estado.
- [ ] Duracion de acceso por defecto: 30 dias.
- [ ] Duplicar curso.
- [ ] RLS y permisos de administracion.

### 4. Modulos y lecciones

- [ ] Tabla `course_modules`.
- [ ] Tabla `lessons`.
- [ ] Estructura Curso -> Modulos -> Lecciones.
- [ ] Crear, editar y eliminar modulos.
- [ ] Crear, editar y eliminar lecciones.
- [ ] Orden drag and drop de modulos y lecciones.
- [ ] Campos de leccion: titulo, descripcion, Bunny URL/ID, material descargable, estado activo/inactivo.

### 5. Examenes

- [ ] Tabla `exams`.
- [ ] Tabla `exam_questions`.
- [ ] Tabla `exam_options`.
- [ ] Tabla `exam_attempts`.
- [ ] Configuracion por curso: nota minima e intentos.
- [ ] Banco de preguntas con alternativas y respuesta correcta.
- [ ] Resultados por usuario: nota, intento, aprobado/desaprobado y fecha.
- [ ] Resultados por curso: promedio y tasa de aprobacion.
- [ ] Regla MVP: examen final obligatorio para certificado.

### 6. Usuarios y accesos

- [x] Tabla base `public.users`.
- [ ] Busqueda y filtros de usuarios.
- [ ] Ficha del usuario con datos, cursos, accesos, progreso, examenes, certificados y compras.
- [ ] Tabla `course_enrollments` o `user_course_access`.
- [ ] Estados de acceso: activo, vencido y bloqueado.
- [ ] Asignar curso manual por cortesia.
- [ ] Extender acceso, por ejemplo +30 dias.
- [ ] Bloquear/desbloquear usuario.
- [ ] Resetear progreso, opcional.
- [ ] Confirmar regla: 30 dias desde pago o desde primer acceso.

### 7. Ventas y pagos con Flow

- [ ] Tabla `transactions` o `payments`.
- [ ] Estados Flow: pagado, pendiente y fallido.
- [ ] Checkout Flow.
- [ ] Webhook de confirmacion de Flow.
- [ ] Al confirmar pago: crear compra y activar acceso.
- [ ] Guardar payload/logs de Flow para soporte.
- [ ] Detalle de transaccion.
- [ ] Exportacion CSV de ventas.

### 8. Certificados

- [ ] Tabla `certificates`.
- [ ] Codigo unico por certificado.
- [ ] Emision automatica cuando usuario completa curso y aprueba examen.
- [ ] Generacion PDF con una plantilla MVP.
- [ ] Guardado/descarga del PDF.
- [ ] Reenvio de correo de certificado.
- [ ] Revocar certificado, opcional.
- [ ] Forzar emision desde soporte.

### 9. Brevo

- [x] Endpoint base `api/emails/send-transactional.js`.
- [ ] Bienvenida / creacion de cuenta.
- [ ] Confirmacion de compra y acceso activado.
- [ ] Certificado emitido con link o adjunto.
- [ ] Reset de password, si se usa flujo custom.
- [ ] Recordatorio de acceso por vencer.
- [ ] Reactivacion / upsell post-curso.
- [ ] Configurar SMTP de Supabase con Brevo si se decide usar dominio propio para Auth.

### 10. Bunny.net

- [ ] Definir si materiales descargables van en Bunny o Supabase Storage.
- [ ] Guardar Bunny URL/ID por leccion.
- [ ] Proteger acceso a videos/materiales segun compra o inscripcion.

### 11. Deploy

- [ ] Configurar proyecto en Vercel.
- [ ] Agregar variables de entorno de produccion.
- [ ] Validar rutas SPA con `vercel.json`.
- [ ] Validar endpoints serverless.
- [ ] Documentar deploy y rollback.

## Variables de entorno

Frontend:

```env
VITE_SUPABASE_URL=https://catmhdvuyvmdgjrrnonj.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

Serverless:

```env
BREVO_API_KEY=your-brevo-api-key
BREVO_SENDER_EMAIL=medicri@crackstudio.pe
BREVO_SENDER_NAME=Medicina Critica
INTERNAL_API_SECRET=your-random-server-to-server-secret
```

No colocar claves privadas, password de base de datos, service role key ni API keys de Brevo dentro del frontend. En Vercel, las variables privadas no deben llevar prefijo `VITE_`.

## Supabase Auth y `public.users`

El registro actual usa email/password. En ese flujo, el campo nativo `phone` de Supabase Auth puede quedar vacio porque Supabase lo reserva para autenticacion por telefono. Para el MVP, el telefono se guarda en `user_metadata` y se sincroniza a `public.users`.

La migracion esta en:

```txt
supabase/migrations/20260412000000_create_public_users.sql
```

Esta migracion crea:

- Tabla `public.users`.
- Relacion `public.users.id -> auth.users.id`.
- Columnas de perfil: email, nombre, documento, telefono, rol y estado.
- RLS para que cada usuario lea/actualice su propio perfil.
- Trigger `sync_auth_user_to_public_users` para copiar automaticamente `user_metadata` desde Supabase Auth.
- Backfill para copiar usuarios que ya existan en `auth.users`.

Para aplicarla desde Supabase Dashboard:

1. Entrar al proyecto Supabase.
2. Ir a SQL Editor.
3. Abrir el archivo `supabase/migrations/20260412000000_create_public_users.sql`.
4. Copiar el SQL completo.
5. Ejecutarlo en SQL Editor.
6. Revisar Table Editor -> `users`; los usuarios existentes en Auth tambien deberian copiarse.
7. Registrar un usuario nuevo y confirmar que aparezca en Authentication -> Users y Table Editor -> `users`.

Si un usuario ya quedo creado en Authentication pero no aparece en `public.users`, ejecutar:

```txt
supabase/sql/sync_existing_auth_users.sql
```

## Configurar correo de confirmacion

Para personalizar el correo que ahora llega como "Confirm Your Signup":

1. Entrar a Supabase Dashboard.
2. Ir a Authentication.
3. Ir a Email Templates.
4. Editar Confirm signup.
5. Cambiar subject y contenido a espanol.
6. Verificar que el link de confirmacion use la variable que entrega Supabase para confirmar el email.

Para que Supabase Auth envie desde dominio propio o Brevo:

1. Entrar a Authentication.
2. Ir a Settings.
3. Buscar SMTP settings.
4. Activar Custom SMTP.
5. Colocar los datos SMTP de Brevo.
6. Probar el envio desde Supabase.

## Brevo

La funcion `api/emails/send-transactional.js` esta pensada para correos transaccionales: bienvenida, compra, certificado, recordatorios y soporte. No se debe llamar directamente desde React con secretos visibles.

El endpoint requiere:

- `BREVO_API_KEY`
- `BREVO_SENDER_EMAIL`
- `BREVO_SENDER_NAME`
- `INTERNAL_API_SECRET`

Ejemplo de body server-to-server:

```json
{
  "to": [{ "email": "alumno@correo.com", "name": "Alumno" }],
  "subject": "Bienvenido a Medicina Critica",
  "htmlContent": "<p>Tu cuenta fue creada correctamente.</p>"
}
```

Debe enviarse con header:

```txt
x-app-secret: valor-de-INTERNAL_API_SECRET
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
