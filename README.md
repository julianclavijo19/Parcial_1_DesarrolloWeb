# Parcial 1 - Desarrollo Web: Sitio Web de Barbería

Este proyecto es una aplicación web funcional para una barbería ficticia llamada "El Estilo". La aplicación cumple con una serie de requisitos técnicos que demuestran el uso de tecnologías web modernas del lado del cliente, como componentes modulares, plantillas, carga de datos asíncrona y Web Components.

## Estructura del Proyecto

```
.
├── components
│   ├── footer.html
│   ├── header.html
│   └── sidebar.html
├── css
│   ├── login.css
│   └── styles.css
├── data
│   └── productos.json
├── js
│   ├── components
│   │   └── product-card.js
│   └── main.js
├── index.html
├── login.html
└── README.md
```

---

## Implementación Técnica

### 1. Formulario de Inicio de Sesión

Se ha creado una página de `login.html` con un formulario que solicita un correo y una contraseña.

- **Validación**: La lógica de validación se encuentra en `js/main.js`. Esta comprueba si el formulario de login existe en la página actual antes de ejecutarse.
- **Credenciales**: Se utilizan credenciales quemadas en el código (`123@gmail.com` y `123`) para la validación.
- **Redirección**: Si las credenciales son correctas, el usuario es redirigido a `index.html`. En caso contrario, se muestra un mensaje de error dinámicamente.

> **ADVERTENCIA DE SEGURIDAD**: Este método de autenticación no es seguro y se utiliza únicamente con fines educativos. En una aplicación real, las contraseñas nunca deben estar quemadas en el código del cliente. Se deben utilizar sistemas de autenticación seguros del lado del servidor con bases de datos y hashing de contraseñas.

### 2. Fragmentos de HTML (Modularidad)

Para evitar la repetición de código y facilitar el mantenimiento, las partes comunes de la página principal se han separado en "fragmentos":

- `components/header.html`: Contiene la cabecera del sitio.
- `components/footer.html`: Contiene el pie de página.
- `components/sidebar.html`: Contiene el menú de navegación lateral.

Estos fragmentos se cargan dinámicamente en `index.html` usando la función `loadComponent` en `js/main.js`, que utiliza la API `fetch` para inyectar el contenido en los contenedores correspondientes (`#header-container`, etc.).

### 3. Plantillas y Datos Externos (API Fetch)

La sección de "Productos Destacados" se genera dinámicamente a partir de datos externos.

- **Datos**: La información de los productos se almacena en `data/productos.json`.
- **Carga Asíncrona**: Al cargar la página principal, `js/main.js` utiliza la API `fetch` para solicitar y procesar este archivo JSON.
- **Renderizado**: Por cada producto en el JSON, se crea un Web Component `<product-card>` para mostrarlo en la página.

### 4. Web Components Personalizados

Para encapsular la lógica y el estilo de las tarjetas de producto, se creó un Web Component personalizado:

- **Definición**: El componente `<product-card>` está definido en `js/components/product-card.js`.
- **Shadow DOM**: Utiliza el **Shadow DOM** para encapsular su estructura (HTML) y sus estilos (CSS). Esto previene que los estilos del componente afecten al resto de la página y viceversa.
- **Atributos**: El componente acepta atributos (`name`, `description`, `price`, `image-src`) para configurar su contenido, lo que lo hace altamente reutilizable.
- **Plantilla (`<template>`)**: La estructura interna del componente se define una sola vez dentro de una etiqueta `<template>`. Esto es muy eficiente, ya que el navegador no renderiza el contenido de la plantilla hasta que se utiliza, y puede ser clonado para cada instancia del componente.

---

## Buenas Prácticas Aplicadas

- **Separación de Responsabilidades**: El código está organizado en archivos distintos para HTML, CSS y JavaScript, mejorando la legibilidad y el mantenimiento.
- **Consistencia en Nombres**:
  - Se utiliza `camelCase` para variables y funciones en JavaScript (e.g., `loginForm`, `loadComponent`).
  - Se utiliza `kebab-case` para clases CSS y nombres de archivos (e.g., `login-container`, `product-card.js`).
- **Modularidad**: El uso de fragmentos, la carga asíncrona de datos y los Web Components promueven un código más modular y reutilizable.
- **Código Limpio**: El código está indentado correctamente y se han añadido comentarios donde la lógica puede ser compleja.
