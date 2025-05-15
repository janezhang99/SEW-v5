import type { ModuleFlow } from "./types"
import { v4 as uuidv4 } from "uuid"

// Assessment module to understand the user's background, goals, and preferences
export const assessmentModule: ModuleFlow = {
  id: "assessment",
  name: "Initial Assessment",
  description: "Get to know you and your project goals",
  category: "assessment",
  skillLevel: "all",
  estimatedTimeMinutes: 10,
  steps: [
    {
      id: uuidv4(),
      type: "prompt",
      content: "Welcome to Small Economy Works! I'm your AI companion. What's your name?",
      nextStepId: "ask-community",
    },
    {
      id: "ask-community",
      type: "question",
      content: "Great to meet you! What type of community are you from? (rural, remote, Northern, Indigenous, etc.)",
      nextStepId: "ask-project",
    },
    {
      id: "ask-project",
      type: "question",
      content: "What kind of project or business are you interested in developing?",
      nextStepId: "ask-experience",
    },
    {
      id: "ask-experience",
      type: "question",
      content: "Have you worked on business projects before? (never, a little, quite a bit)",
      nextStepId: "ask-stage",
    },
    {
      id: "ask-stage",
      type: "question",
      content: "What stage is your business idea in? (just an idea, starting to plan, already started)",
      nextStepId: "ask-learning",
    },
    {
      id: "ask-learning",
      type: "question",
      content:
        "How do you prefer to learn? (by reflecting, by seeing examples, by doing practical activities, by discussing with others)",
      nextStepId: "ask-communication",
    },
    {
      id: "ask-communication",
      type: "question",
      content:
        "How do you prefer information to be communicated to you? (detailed explanations, concise points, visual examples, through stories or metaphors, straightforward facts)",
      nextStepId: "ask-interests",
    },
    {
      id: "ask-interests",
      type: "question",
      content:
        "What aspects of business are you most interested in learning about? (marketing, finance, community impact, etc.)",
      nextStepId: "ask-strengths",
    },
    {
      id: "ask-strengths",
      type: "question",
      content: "What would you say are your biggest strengths when it comes to projects or work?",
      nextStepId: "ask-growth",
    },
    {
      id: "ask-growth",
      type: "question",
      content: "What areas would you like to grow or improve in?",
      nextStepId: "ask-tone",
    },
    {
      id: "ask-tone",
      type: "question",
      content:
        "How would you prefer me to communicate with you? (as a coach who asks questions, as a cheerleader who encourages, through thoughtful inquiry, with direct instructions, or adapting to what you need)",
      options: [
        {
          text: "coach",
          nextStepId: "summary",
          metadata: { tonePreference: "coaching" },
        },
        {
          text: "cheerleader",
          nextStepId: "summary",
          metadata: { tonePreference: "cheerleading" },
        },
        {
          text: "inquiry",
          nextStepId: "summary",
          metadata: { tonePreference: "inquiry" },
        },
        {
          text: "direct",
          nextStepId: "summary",
          metadata: { tonePreference: "directive" },
        },
        {
          text: "adapt",
          nextStepId: "summary",
          metadata: { tonePreference: "adaptive" },
        },
      ],
    },
    {
      id: "summary",
      type: "information",
      content:
        "Thank you for sharing that information! Based on what you've told me, I'll customize your learning journey to match your preferences and goals. I'll help you develop your project while accessing micro-grant funding. As you complete each task, you'll unlock portions of the grant to help bring your idea to life!\n\nLet's get started with your first set of tasks. Each completed task will unlock funding to support your project.",
    },
  ],
}

// Budgeting tutorial module
export const budgetingTutorialModule: ModuleFlow = {
  id: "budgetingTutorial",
  name: "Basic Budgeting",
  description: "Learn how to create a simple budget for your project",
  category: "tutorial",
  skillLevel: "beginner",
  estimatedTimeMinutes: 15,
  steps: [
    {
      id: uuidv4(),
      type: "information",
      content:
        "Welcome to the Basic Budgeting tutorial! Creating a budget is an essential skill for any project. I'll guide you through the process step by step.",
      nextStepId: "budget-importance",
      metadata: {
        tone: "coaching",
      },
    },
    {
      id: "budget-importance",
      type: "information",
      content:
        "A budget helps you plan how to use your resources wisely. It shows funders that you've thought carefully about what you need and how you'll use their support.",
      nextStepId: "budget-categories",
      metadata: {
        tone: "coaching",
      },
    },
    {
      id: "budget-categories",
      type: "information",
      content:
        "Let's start with the main categories for your budget:\n\n1. **Materials & Supplies**: Physical items you need to buy\n2. **Equipment**: Tools or technology you need\n3. **Services**: Things others will do for you\n4. **Transportation**: Getting around for your project\n5. **Other Costs**: Anything that doesn't fit above",
      nextStepId: "budget-exercise",
      metadata: {
        tone: "directive",
        visualAid: "budget-categories-diagram",
      },
    },
    {
      id: "budget-exercise",
      type: "exercise",
      content:
        "Let's practice! Think about your project and list 2-3 items you might need in each category. Don't worry about costs yet - just brainstorm what you'll need.",
      nextStepId: "budget-estimating",
    },
    {
      id: "budget-estimating",
      type: "information",
      content:
        "Great! Now let's talk about estimating costs. For each item:\n\n1. Research the actual cost if possible\n2. If you can't find an exact cost, make your best guess\n3. Always round up a little to give yourself some buffer\n\nFor example, if materials might cost $95-105, budget $110 to be safe.",
      nextStepId: "budget-template",
    },
    {
      id: "budget-template",
      type: "information",
      content:
        "Here's a simple template you can use:\n\n| Category | Item | Quantity | Cost per item | Total Cost |\n|---------|------|----------|--------------|------------|\n| Materials | Example | 5 | $10 | $50 |\n\nTry creating this for your project. Start with just a few items in each category.",
      nextStepId: "budget-reflection",
    },
    {
      id: "budget-reflection",
      type: "reflection",
      content:
        "As you work on your budget, think about:\n\n- What items are absolutely necessary?\n- Where could you reduce costs if needed?\n- Are there any in-kind contributions you could use? (things people might donate or lend)\n\nWhat's one insight you've had while thinking about your budget?",
      nextStepId: "budget-conclusion",
    },
    {
      id: "budget-conclusion",
      type: "information",
      content:
        "Excellent work! You've learned the basics of creating a project budget. Remember:\n\n- Be realistic about costs\n- Include all necessary items\n- Consider ways to be cost-efficient\n- Update your budget as you learn more\n\nWhen you're ready to create your full project budget, I'll be here to help you refine it.",
    },
  ],
}
