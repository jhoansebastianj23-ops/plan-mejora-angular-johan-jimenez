# Plan de mejora Angular: Módulo de Productos

Aplicación web en Angular con arquitectura modular (NgModules, sin componentes standalone) que consume la API pública [DummyJSON](https://dummyjson.com) e implementa autenticación con token JWT.

## Datos del aprendiz

- **Aprendiz:** Johan Sebastián Jiménez García
- **Ficha:** 3231651
- **Centro de formación:** SENA
- **Recurso asignado:** Productos (`/products`)

## Tecnologías

- Angular 19 (NgModules, `standalone: false`)
- TypeScript
- SCSS (estilos propios, sin librerías externas)
- RxJS y HttpClient
- Formularios reactivos

## Requisitos previos

- Node.js 20.19 o superior (o 22.12 o superior)
- npm
- Git

Verifica las versiones con:

```bash
node -v
npm -v
```

## Instrucciones de ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/jhoansebastianj23-ops/plan-mejora-angular-johan-jimenez.git
```

2. Entrar a la carpeta del proyecto:

```bash
cd plan-mejora-angular-johan-jimenez
```

3. Instalar las dependencias:

```bash
npm install
```

4. Iniciar el servidor de desarrollo:

```bash
npx ng serve
```

5. Abrir en el navegador: `http://localhost:4200`

## Usuario de prueba

- **Usuario:** `emilys`
- **Contraseña:** `emilyspass`

## Funcionalidades

- **Autenticación:** inicio de sesión con `POST /auth/login`. El `accessToken` y los datos básicos del usuario se guardan en `localStorage`. Cierre de sesión que borra esos datos y redirige al login.
- **Guards:** `authGuard` protege las rutas privadas y `guestGuard` impide volver al login con una sesión activa.
- **Interceptor:** `jwtInterceptor` agrega `Authorization: Bearer <token>` a las peticiones de forma automática.
- **Productos:** listado paginado de 10 en 10, búsqueda por nombre, vista de detalle, formulario reactivo de creación y edición en un mismo componente, y eliminación con confirmación.
- **Perfil:** muestra la información del usuario con `GET /auth/me`, sin enviar el token manualmente.
- **Navegación:** la ruta raíz redirige a `/products` y cualquier ruta inexistente muestra la página 404.

## Rutas

| Ruta | Descripción | Protegida |
|---|---|---|
| `/auth/login` | Inicio de sesión | No (solo invitados) |
| `/products` | Listado con búsqueda y paginación | Sí |
| `/products/new` | Crear producto | Sí |
| `/products/:id` | Detalle de un producto | Sí |
| `/products/:id/edit` | Editar producto | Sí |
| `/profile` | Perfil del usuario | Sí |
| `**` | Página 404 | No |

## Estructura del proyecto

```
src/app/
├── core/          (AuthService, guards, interceptor, modelos)
├── shared/        (navbar, página 404, módulos reexportados)
└── features/
    ├── auth/      (login)
    ├── products/  (listado, detalle, formulario, paginación)
    └── profile/   (perfil del usuario)
```

Los módulos `auth`, `products` y `profile` se cargan de forma perezosa (lazy loading).

## Notas

- DummyJSON simula crear, editar y eliminar productos: responde con éxito, pero no guarda los cambios. La aplicación muestra un mensaje de confirmación con la respuesta recibida.
- El token de sesión dura 30 minutos. Si vence, hay que cerrar sesión e ingresar de nuevo.