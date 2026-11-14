LIMBUS REACT

Proyecto de Fullstack II. Aplicación web en React creada apartir de el repositorio del profesor, nuestro proyecto inicial fue el proyecto html de wuwa el cual "migramos" o "transformamos" a un proyecto react desde html segun las instrucciones vistas en clase, ese proyecto wuwa en react fue utilizado como "base" o como "maqueta" para realizar este proyecto sobre el videojuego limbus company (si gusta me manda un mensaje profe y le mando el repo del wuwa en react si tmb lo queria ver).


INSTRUCCIONES DE INSTALACION
1. Descargar y Extraer todo el ZIP.
2. Abre en VS Code la carpeta que contiene package.json,package-lock.json,src/ y public/.
3. Abre una terminal en esa carpeta y ejecuta estos comandos. En Windows PowerShell puedes usar npm.cmd en lugar de npm (se necesita node.js)
   -npm ci o npm install
   -npm test (si desea ejecutar los test, usted dijo que por protocolo se hacia de esta forma)
   -npm start (en caso de que no se despliegue automaticamente la pagina en el navegador puede buscar http://localhost:3000/)

PRUEBAS CON JEST
-npm run test:ci
-npm run test:ci -- Cart.test.jsx (en caso de correr los test solo del carrito)
-npm run test:coverage --> Esta corre los test y genera un reporte de cobertura, se creara una carpeta nueva llamada coverage en la cual podra abrir un html para ver el reporte generado --> Ruta: coverage/lcov-report/index.html

Compilación: npm run build

Los precios y los catalogos son de demostracion y no son datos reales, 
El carrito se guarda en localStorage y funciona sin una API de compras.
