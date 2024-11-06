const express = require("express");
const app = express();
const PORT = 3000;
const conectarDB = require('./config/db');
const cors = require('cors');

conectarDB();

app.use(cors());

app.use(express.json());

const router = require('./routes/producto')
app.use('/api/productos', router)

app.get('/', (req, res) => res.send("Buenas!"))

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`))