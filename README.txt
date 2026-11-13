1. Extrae todo el ZIP.
2. Abre en VS Code la carpeta 02-limbus-react.
3. Abre una terminal donde está package.json. Usa Node.js 20 o superior.
4. Ejecuta npm ci.
5. Ejecuta npm start y abre http://localhost:3000/.
6. Entra a Tienda, agrega un peluche y abre Carrito desde la barra de navegación.

Pruebas del carrito: npm run test:ci -- Cart.test.jsx
Todas las pruebas: npm run test:ci
Cobertura: npm run test:coverage
Compilación: npm run build

Los precios en CLP y las imágenes del catálogo son de demostración.
El carrito se guarda en localStorage y funciona sin una API de compras.
