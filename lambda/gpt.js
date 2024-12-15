const dotenv = require("dotenv");
dotenv.config(); 
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
});

const handler = async (context) => {
    try {
        // Captura o pedido do usuário
        const userRequest = context || "Olá, tudo bem?";
        console.log("User Request:", userRequest);

        // Chamada para a API do OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userRequest }],
        });

        console.log("Resposta da OpenAI:", completion);

        // Formata a resposta
        const chatGptResponse = completion.choices[0].message.content || "Não entendi a resposta.";

        return {
            version: "1.0",
            response: {
                outputSpeech: {
                    type: "PlainText",
                    text: chatGptResponse,
                },
                shouldEndSession: true,
            },
        };
    } catch (error) {
        console.error("Erro ao acessar a API do OpenAI:", error);

        return {
            version: "1.0",
            response: {
                outputSpeech: {
                    type: "PlainText",
                    text: "Desculpe, ocorreu um problema ao processar sua solicitação.",
                },
                shouldEndSession: true,
            },
        };
    }
};

module.exports = handler;
