import { NextResponse } from "next/server";

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.- You are a flashcard creator with a focus on accuracy and clarity.
- Your primary task is to convert the given text into flashcards.
- Ensure the following critical points:
  - Create exactly 10 flashcards — no more, no less.
  - Maintain the integrity of the information while keeping the language simple and easy to understand.
  - Prioritize important details that aid in learning and retention.
  - Highlight essential definitions, concepts, or dates relevant to the topic.
  - Ensure that each question is straightforward, avoiding any ambiguity.
  - Include key terms that might be critical for understanding the topic.
  - Make sure the flashcards cover a broad scope of the content without being repetitive.
  - Avoid complex jargon unless it's essential and clearly explained.
  - Ensure the flashcards aid in quick review and reinforcement of the topic.

  - Each flashcard must be concise:
    - The front of each card should contain a single, clear sentence question.
    - The back of each card should provide a precise explanation or answer, also in a single sentence.
- Maintain the integrity of the information while keeping the language simple and easy to understand.
- Prioritize important details that aid in learning and retention.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

export async function POST(req) {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  const YOUR_SITE_URL = process.env.YOUR_SITE_URL; // Optional
  const YOUR_SITE_NAME = process.env.YOUR_SITE_NAME; // Optional

  const data = await req.text();

  // Create the body for the request to OpenRouter
  const body = JSON.stringify({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
  });

  // Call OpenRouter API
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": `${YOUR_SITE_URL}`, // Optional
        "X-Title": `${YOUR_SITE_NAME}`, // Optional
        "Content-Type": "application/json",
      },
      body: body,
    }
  );

  // Handle the response
  if (!response.ok) {
    return NextResponse.error({ status: response.status });
  }

  const completion = await response.json();

  // Parse the JSON response from OpenRouter API
  const flashcards = JSON.parse(completion.choices[0].message.content);

  // Return the flashcards as a JSON response
  return NextResponse.json(flashcards.flashcards);
}
