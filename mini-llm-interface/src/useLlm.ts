import OpenAI from "openai";
import { useState } from "react";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
  dangerouslyAllowBrowser: true,
});
const NUMBER_OF_PARALLEL_REQUESTS = 4;
const defaultResults: string[] = new Array(NUMBER_OF_PARALLEL_REQUESTS).fill(
  ""
);

export const useLlm = () => {
  const [results, setResults] = useState<string[]>(defaultResults);
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (prompt: string, question: string) => {
    setResults(defaultResults);
    setIsLoading(true);
    await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      results.map(async (_, i) => {
        const response = await openai.chat.completions.create({
          model: "gpt-4-turbo-preview",
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: question },
          ],
        });

        const answer = response.choices[0].message.content;
        if (!answer) {
          console.error("No answer found");
          return;
        }

        setResults((prev) => {
          const newResults = [...prev];
          newResults[i] = answer;
          return newResults;
        });
      })
    );
    setIsLoading(false);
  };
  return {
    onSubmit,
    results,
    isLoading,
  };
};
