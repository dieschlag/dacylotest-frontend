"use client";

import { Button } from "@/components/ui/button";
import { getRandomQuote } from "@/lib/quote";
import { Quote } from "@/types/quote";
import { useEffect, useState } from "react";

export function TestClient() {
  const [randomQuote, setRandomQuote] = useState<Quote | undefined>(undefined);
  const [testStarted, setTestStarted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    getRandomQuote().then((response) => {
      if ("data" in response) {
        setRandomQuote(response.data);
      } else {
        setErrorMessage(response.message!);
      }
    });
  });
  return (
    <div className="flex flex-col gap-8 items-center">
      <p>
        Click on "Start Test" to generate a random text and test your writing
        speed!
      </p>

      <div className="flex flex-col">
        {testStarted ? (
          <div className="flex flex-col">
            {!errorMessage && randomQuote ? (
              <p>{randomQuote.paragraph}</p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ) : (
          <Button
            className="px-4 py-2 bg-slate-600 text-white font-bold w-fit"
            onClick={() => setTestStarted(true)}
          >
            Start Test
          </Button>
        )}
      </div>
    </div>
  );
}
