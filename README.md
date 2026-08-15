# Tigre de Bengala — Tutor Universitario

Chat con IA (avatar 3D, skin morado) listo para subir a internet y compartir por link.

## 1. Consigue tu clave de la API de Anthropic
1. Entra a https://console.anthropic.com
2. Crea una cuenta (o inicia sesión) y ve a **API Keys**.
3. Crea una clave nueva y cópiala. Se ve algo así: `sk-ant-...`
4. Nota: la API de Anthropic es de pago por uso (tiene créditos gratis al inicio en muchos casos). Revisa precios en la consola.

## 2. Prueba que funcione en tu computadora (opcional pero recomendado)
1. Instala [Node.js](https://nodejs.org) si no lo tienes (versión 18 o más nueva).
2. Abre una terminal dentro de esta carpeta y corre:
   ```
   npm install
   ```
3. Copia `.env.example` a un archivo nuevo llamado `.env` y pega tu clave:
   ```
   ANTHROPIC_API_KEY=sk-ant-tu-clave-aqui
   ```
4. Corre:
   ```
   npm start
   ```
5. Abre `http://localhost:3000` en tu navegador. Deberías ver el chat funcionando.

## 3. Súbelo gratis a internet (Render.com)
Render tiene un plan gratuito para proyectos pequeños como este.

1. Crea una cuenta en https://render.com (puedes usar tu cuenta de GitHub para entrar más rápido).
2. Sube esta carpeta a un repositorio de GitHub:
   - Crea un repo nuevo en https://github.com/new
   - Sube todos estos archivos (puedes arrastrar la carpeta en la interfaz web de GitHub, o usar `git` si lo conoces).
   - **Importante:** no subas tu archivo `.env` (contiene tu clave secreta). Solo sube `.env.example`.
3. En Render, click en **New +** → **Web Service**.
4. Conecta tu repositorio de GitHub.
5. Configura:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
6. En la sección **Environment Variables**, agrega:
   - Key: `ANTHROPIC_API_KEY`
   - Value: tu clave (la misma de sk-ant-...)
7. Click en **Create Web Service**. Espera unos minutos mientras se construye.
8. Cuando termine, Render te da un link tipo `https://tigre-de-bengala.onrender.com` — ese es el link que puedes compartir con quien quieras. Cualquiera que lo abra podrá chatear con el tutor, sin instalar nada.

### Nota sobre el plan gratuito de Render
El plan gratis "duerme" el servicio si nadie lo usa por un rato, y tarda unos 30-50 segundos en despertar en la primera visita después de estar inactivo. Para un proyecto de universidad esto normalmente no es problema.

## Alternativas a Render
Si prefieres, este mismo proyecto (Node + Express) también funciona en:
- **Railway** (railway.app)
- **Fly.io** (fly.io)
- **Cyclic** (cyclic.sh)

El proceso es muy parecido: conectar el repo, configurar la variable de entorno `ANTHROPIC_API_KEY`, y desplegar.

## Estructura del proyecto
```
tigre-tutor/
├── server.js          → backend (Express) que llama a la API de Anthropic
├── package.json        → dependencias
├── .env.example         → plantilla para tu clave (copia a .env, nunca la subas a GitHub)
└── public/
    └── index.html        → todo el frontend (chat + avatar 3D), sin necesidad de compilar nada
```

## Personalizar
- El texto de bienvenida y las reglas del tutor están en `SYSTEM_PROMPT` dentro de `server.js`.
- Los colores están en la sección `:root` de `public/index.html`.
