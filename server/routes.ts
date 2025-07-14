import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatResponse } from "./services/gemini";
import { performWebSearch, formatSearchResultsForAI } from "./services/websearch";
import { insertMessageSchema, insertConversationSchema } from "@shared/schema";
import { z } from "zod";

const chatRequestSchema = z.object({
  message: z.string().min(1),
  conversationId: z.number().nullable().optional(),
  webSearchEnabled: z.boolean().default(true),
  userProfile: z.object({
    name: z.string().optional(),
    pronouns: z.string().optional()
  }).optional()
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Create a new conversation
  app.post("/api/conversations", async (req, res) => {
    try {
      const validatedData = insertConversationSchema.parse(req.body);
      const conversation = await storage.createConversation(validatedData);
      res.json(conversation);
    } catch (error) {
      res.status(400).json({ error: "Invalid conversation data" });
    }
  });

  // Get conversation messages
  app.get("/api/conversations/:id/messages", async (req, res) => {
    try {
      const conversationId = parseInt(req.params.id);
      const messages = await storage.getMessagesByConversationId(conversationId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Send a chat message
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, conversationId, webSearchEnabled, userProfile } = chatRequestSchema.parse(req.body);
      
      let actualConversationId = conversationId;
      
      // Create a new conversation if none exists
      if (!actualConversationId) {
        const newConversation = await storage.createConversation({
          title: message.slice(0, 50) + (message.length > 50 ? "..." : ""),
          userId: null
        });
        actualConversationId = newConversation.id;
      }

      // Save user message
      await storage.createMessage({
        conversationId: actualConversationId,
        content: message,
        role: "user",
        webSearchUsed: false
      });

      // Get conversation history
      const messages = await storage.getMessagesByConversationId(actualConversationId);
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Perform web search if enabled
      let webSearchResults = "";
      if (webSearchEnabled) {
        try {
          const searchResponse = await performWebSearch(message);
          webSearchResults = formatSearchResultsForAI(searchResponse);
        } catch (error) {
          console.error("Web search failed:", error);
        }
      }

      // Generate AI response
      const aiResponse = await generateChatResponse(
        message,
        conversationHistory.slice(-10), // Keep last 10 messages for context
        webSearchEnabled,
        webSearchResults,
        userProfile
      );

      // Save AI response
      const aiMessage = await storage.createMessage({
        conversationId: actualConversationId,
        content: aiResponse.content,
        role: "assistant",
        webSearchUsed: aiResponse.webSearchUsed
      });

      res.json({
        message: aiMessage,
        conversationId: actualConversationId
      });

    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
