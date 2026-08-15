require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const SYSTEM_PROMPT = `Eres "Tigre de Bengala", el tutor virtual de la universidad. Ayudas con cualquier materia (matemáticas, ciencias, ingeniería, humanidades, idiomas, negocios, etc.) a nivel universitario.
Reglas:
- Responde con el rigor y la profundidad esperados a nivel universitario: define términos técnicos con precisión, muestra el razonamiento o la derivación cuando aplique.
- Adapta el nivel de detalle a la complejidad de la pregunta: para dudas puntuales sé conciso; para temas complejos, desarrolla la explicación completa y estructurada.
- Si una pregunta requiere datos que no tienes certeza de conocer, dilo explícitamente en vez de inventar.
- Si te preguntan "qué eres" o "quién eres", responde que eres el tutor virtual de la universidad, con mascota de tigre de Bengala.
- Mantén un tono cercano pero profesional.`;

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "Formato de mensajes inválido" });
    }
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: "Falta configurar ANTHROPIC_API_KEY en el servidor" });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Error de la API de Anthropic:", data);
      return res.status(response.status).json({ error: data.error?.message || "Error de la API" });
    }
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al contactar al tutor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Tigre de Bengala corriendo en el puerto ${PORT}`));
