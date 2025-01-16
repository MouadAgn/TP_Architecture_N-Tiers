const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

// Redirection vers le User Service
app.use('/api/users', createProxyMiddleware({
  target: 'http://localhost:3000/api/users',
  changeOrigin: true,
}));


// Redirection vers le Product Service
const PORT = process.env.GATEWAY_PORT || 8000; // Utiliser 8000 au lieu de 1000
app.listen(PORT, () => {
  console.log(`API Gateway démarrée sur le port ${PORT}`);
});