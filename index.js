require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const config = require('./config');
const tareaRoutes = require('./routes/tareaRoutes');
const { default: mongoose } = require('mongoose');


const app = express();

// Conectar a MongoDB
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a MongoDB establecida'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

app.use(bodyParser.json());

// Endpoint para la autenticación
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.USUARIO_JWT && password === process.env.PASSWORD_JWT) {
        const token = jwt.sign({ username }, config.JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Credenciales inválidas' });
    }
});

// Middleware para verificar el token en las rutas protegidas
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'Token no proporcionado' });

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ error: 'Error al autenticar el token' });

        req.username = decoded.username;
        next();
    });
}


// Aplicar el middleware de verificación de token a las rutas de tareas
app.use('/api/tareas', verifyToken, tareaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
