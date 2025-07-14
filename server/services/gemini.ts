import { GoogleGenAI } from "@google/genai";

// Note that the newest Gemini model series is "gemini-2.5-flash" or "gemini-2.5-pro"
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ChatResponse {
  content: string;
  webSearchUsed: boolean;
}

export async function generateChatResponse(
  message: string, 
  conversationHistory: { role: string; content: string }[] = [],
  webSearchEnabled: boolean = true,
  webSearchResults?: string
): Promise<ChatResponse> {
  try {
    let systemPrompt = `You are Cloud, a friendly AI assistant with a brotherly personality. You are helpful, enthusiastic, and use casual language. You love to help people and always try to be encouraging and supportive. Use emojis occasionally to make conversations more friendly. Always respond in a warm, approachable manner.`;

    if (webSearchEnabled && webSearchResults) {
      systemPrompt += `\n\nYou have access to current web search results. Use this information to provide up-to-date and accurate responses. Here are the search results:\n\n${webSearchResults}`;
    }

    // Convert conversation history to Gemini format
    const contents = [];
    
    // Add conversation history
    for (const msg of conversationHistory) {
      contents.push({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      });
    }
    
    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
      contents: contents
    });

    return {
      content: response.text || "I'm sorry, I couldn't generate a response.",
      webSearchUsed: webSearchEnabled && !!webSearchResults
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate chat response");
  }
}
