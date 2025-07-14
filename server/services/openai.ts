import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || ""
});

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

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return {
      content: response.choices[0].message.content || "I'm sorry, I couldn't generate a response.",
      webSearchUsed: webSearchEnabled && !!webSearchResults
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate chat response");
  }
}
