# Proyecto LMS - Medicina Crítica

## **1 Objetivo del desarrollo**

Construir una plataforma LMS con:

- **Frontend (React)** para **Panel Administrativo (Backoffice)**.
- **Backend/DB/Auth (Supabase)** para usuarios, cursos, progreso, exámenes, compras, certificados.
- Integraciones: **Brevo (emails)**, **Flow (pagos)**, **Bunny.net (video/archivos/streaming)**.
- **Deploy en Vercel**.

---

## **2 Stack y consideraciones técnicas (obligatorias)**

### **Tecnologías**

- **React** (panel admin + Interfaz de usuario)
- **Supabase**
    - Auth (usuarios)
    - Postgres (data)
    - Storage (no videos)
    - Edge Functions / Serverless Functions (para webhooks de Flow, generación de certificados, triggers de emails)

### **Deploy**

- **Vercel** (frontend + serverless endpoints si aplica)

### **Integraciones**

- **Brevo**: envío de correos transaccionales y automatizaciones (bienvenida, compra, certificado, recordatorios).
- **Flow**: checkout + webhook de confirmación + estados de pago.
- **Bunny.net**: hosting/streaming de videos.

---

## **3 Módulos del Panel Administrativo (Backoffice)**

### **A Acceso y roles**

- Login de administradores.
- Roles mínimos sugeridos: **Admin / Editor**.
- Permisos por módulo (checklist): Cursos, Lecciones, Exámenes, Usuarios, Ventas, Certificados, Banners, Ayuda, Ajustes.

### **B Dashboard (inicio)**

- KPIs: ventas del mes, nuevos alumnos, certificados emitidos, cursos activos.
- Tablas: últimas transacciones, usuarios recientes.
- Alertas: pagos fallidos/pending y accesos por vencer (si aplica).
- Filtros por rango de fechas.

### **C Gestión de cursos**

- Crear/editar/publicar/despublicar cursos.
- Propiedades del curso:
    - Título, descripción, imagen/thumbnail
    - Tipo: gratuito / pago
    - Precio (si pago)
    - Duración de acceso (por defecto 30 días)
    - Estado: borrador / publicado
- Duplicar curso.

### **D Módulos y lecciones**

- Estructura: Curso → Módulos → Lecciones.
- Crear/editar/eliminar módulos y lecciones.
- Orden drag & drop de módulos y lecciones.
- Por lección:
    - Título, descripción
    - Video (Bunny URL/ID)
    - Material descargable (archivo/link)
    - Estado activo/inactivo

### **E Exámenes (por curso)**

- Configurar examen final:
    - nota mínima, intentos
- Banco de preguntas:
    - pregunta con alternativas, respuesta correcta
- Resultados:
    - por usuario (nota, intento, aprobado/desaprobado, fecha)
    - por curso (promedio, tasa de aprobación)

### **F Usuarios y accesos**

- Listado de usuarios con búsqueda y filtros.
- Ficha del usuario:
    - datos (nombre, email)
    - cursos inscritos/comprados
    - estado de acceso: activo / vencido / bloqueado
    - progreso por curso
    - intentos/resultados de examen
    - certificados emitidos
    - compras/pagos asociados
- Acciones admin:
    - asignar curso manual (cortesía)
    - extender acceso (ej. +30 días)
    - bloquear/desbloquear usuario
    - resetear progreso (opcional)

### **G Ventas / Pagos (Flow)**

- Listado de transacciones:
    - ID, usuario, curso, monto, estado (pagado/pendiente/fallido), fecha
- Detalle de transacción:
    - datos devueltos por Flow + logs
- Exportación CSV de ventas.
- Conciliación basada en webhook: cuando Flow confirma pago → crear compra → activar acceso.

### **H Certificados (PDF + código único)**

- Emisión automática cuando:
    - usuario completa curso + aprueba examen (según reglas).
- Generar **PDF** con plantilla definida.
- Código único por certificado.
- Panel:
    - listado, búsqueda por usuario/código/curso
    - descargar PDF
    - reenviar correo de certificado
    - revocar certificado (opcional)
    - forzar emisión (para soporte)

---

## **4 Automatizaciones de correo (Brevo)**

Se requiere integración para correos transaccionales mínimos:

1. Bienvenida / creación de cuenta
2. Confirmación de compra + acceso activado
3. Certificado emitido (con link / adjunto)
4. Reset de contraseña (si se usa flujo custom)
5. Recordatorio de acceso por vencer (X días antes)
6. Reactivación / upsell (post-curso)

---

## **5 Bunny.net (video y materiales)**

- Admin puede registrar el **video URL/ID** por lección.
- Materiales descargables: link externo o archivo alojado (Bunny o Supabase Storage según decisión).

---

## **6 Reglas de negocio que el programador debe asumir (para cotizar)**

- Acceso por curso: **30 días** (confirmar si corre desde pago o desde primer acceso).
- Examen final obligatorio para certificado: **sí**.
- Certificado: 1 sola plantilla (MVP).
- Estados de pago Flow: pagado/pendiente/fallido.
- Roles: Admin/Editor/Soporte.

---

## **7 Entregables esperados**

- Panel Administrativo en React funcionando.
- Base de datos y Auth en Supabase.
- Webhooks/funciones para:
    - confirmación de pago (Flow)
    - emisión de certificado PDF
    - envío de correos (Brevo)
- Deploy en Vercel + configuración de variables de entorno.