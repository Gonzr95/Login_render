import express from "express";
import cors from "cors";
import { connectDB } from "./db/sequelize.js";
connectDB();
const app = express();
app.disable('x-powered-by');
const port = 3000;
import { router as usersRouter} from "./routes/users.js";

// ********** Middlewares **********
app.use(
  cors({
    //origin: 'http://localhost:5500', // Solo permitimos peticiones desde aquí (puerto típico de Vite/React)
    origin: [
      'http://127.0.0.1:5500', // Live Server suele usar IP numérica
      'http://localhost:5500', // A veces se accede así
      '*'
    ],
      credentials: true // Permite envío de cookies o headers de autorización no se puede usar en conjunto con * por seguridad
  })
);
app.use(express.json()); //Cada vez que llegue body con json convertilo a un objeto JS


// Ruta principal
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Home Server</title>
    </head>
    <body style="font-family:sans-serif; text-align:center; margin-top:100px;">
      <h1>¡Hola Mundo!</h1>
    </body>
    </html>
  `);
  res.statusCode = 200;
});
// Rutas
app.use(usersRouter);


// Servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});