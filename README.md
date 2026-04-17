# Medicina Critica LMS

Portal de alumnos del LMS. Este proyecto consume Supabase para autenticacion, perfiles, cursos, compras y certificados, y usa funciones serverless para pagos con Flow y correos transaccionales.

## Estado actual

### Implementado

- Login, registro y rutas protegidas con Supabase Auth.
- Sincronizacion de `auth.users` hacia `public.users`.
- Perfil del usuario mostrado desde `public.users`.
- Exploracion de cursos reales publicados desde `courses`.
- Mis cursos conectados a `course_enrollments`.
- Mis compras conectadas a `payments`.
- Mis certificados conectados a `certificates`.
- Detalle de curso y vista de curso conectados a `courses`, `course_modules` y `lessons`.
- Reproduccion de videos Bunny Stream usando URL de `play`.
- Activacion de cursos gratuitos via endpoint serverless.
- Integracion base de Flow:
  - crear checkout
  - confirmar pago
  - retorno del pagador
  - activacion de acceso al confirmar pago exitoso
- Base de correos transaccionales con Brevo en `api/emails/send-transactional.js`.

### Pendiente

- Confirmar flujo end-to-end real de Flow en entorno desplegado.
- Corregir cualquier error residual que devuelva `/api/payments/flow/create` al probar con datos reales.
- Configurar SMTP custom en Supabase si se quiere que Auth envie con dominio propio.
- Integrar subida administrativa directa de PDFs y videos hacia Bunny.net.
- Implementar examenes, resultados y certificados automáticos completos.
- Generacion real de PDF de certificados.
- Automatizaciones completas de Brevo: bienvenida, compra, certificado, recordatorios.

## Estructura funcional

### Frontend

- `src/lib/supabaseClient.js`: cliente frontend de Supabase.
- `src/lib/lmsData.js`: capa de datos del portal alumno.
- `src/pages/HomePage.jsx`: explorar cursos.
- `src/pages/MyCoursesPage.jsx`: cursos del alumno.
- `src/pages/PurchasesPage.jsx`: historial de compras.
- `src/pages/CertificatesPage.jsx`: certificados emitidos.
- `src/pages/CourseDetailPage.jsx`: detalle de curso y CTA de compra/acceso.
- `src/pages/CourseStart.jsx`: vista del curso activo.

### Serverless

- `api/enrollments/free.js`: activa cursos gratuitos.
- `api/payments/flow/create.js`: crea checkout en Flow.
- `api/payments/flow/confirm.js`: confirma pago desde Flow.
- `api/payments/flow/return.js`: retorna al usuario luego del pago.
- `api/emails/send-transactional.js`: envio de emails transaccionales con Brevo.

## SQL que debe existir en Supabase

Aplicar en SQL Editor:

```txt
supabase/migrations/20260412000000_create_public_users.sql
supabase/migrations/20260417000000_student_app_policies_flow.sql
supabase/sql/sync_existing_auth_users.sql
```

### Resultado esperado

- `public.users` sincronizada con Auth.
- Lectura de cursos publicados para alumnos autenticados.
- Lectura propia de `course_enrollments`, `payments` y `certificates`.

## Variables de entorno

### Frontend

```env
VITE_SUPABASE_URL=https://catmhdvuyvmdgjrrnonj.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-real-supabase-publishable-key
```

### Serverless

```env
APP_BASE_URL=https://your-real-domain.vercel.app
SUPABASE_URL=https://catmhdvuyvmdgjrrnonj.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-real-supabase-service-role-key

BREVO_API_KEY=your-real-brevo-api-key
BREVO_SENDER_EMAIL=medicri@crackstudio.pe
BREVO_SENDER_NAME=Medicina Critica
INTERNAL_API_SECRET=generate-a-long-random-secret-for-server-to-server-calls

FLOW_API_KEY=your-real-flow-api-key
FLOW_SECRET_KEY=your-real-flow-secret-key
FLOW_BASE_URL=https://www.flow.cl/api
```

Notas:

- `SUPABASE_SERVICE_ROLE_KEY`, `FLOW_SECRET_KEY`, `BREVO_API_KEY` e `INTERNAL_API_SECRET` no van en variables `VITE_*`.
- En local con `vercel dev`, `APP_BASE_URL` debe ser `http://localhost:3000` o el puerto real que use Vercel.
- En produccion, estas variables deben cargarse en Vercel Dashboard.

## Flujo de pago esperado

1. El alumno elige un curso de pago.
2. `POST /api/payments/flow/create` crea la orden en Flow.
3. Flow redirige al checkout.
4. Flow llama `urlConfirmation`.
5. El backend consulta el estado real del pago.
6. Si el pago fue exitoso:
   - actualiza `payments`
   - activa `course_enrollments`
7. El usuario vuelve por `urlReturn`.

## Comandos

```bash
npm install
npm run lint
npm run build
npx vercel dev
```

## Observaciones operativas

- `npm run dev` solo levanta Vite. No sirve para probar funciones `api`.
- Para probar pagos, checkout y endpoints serverless, usar `npx vercel dev`.
- Si el checkout falla, revisar la respuesta de `POST /api/payments/flow/create` en DevTools > Network.
