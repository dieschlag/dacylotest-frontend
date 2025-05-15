"use client";

import { Button } from "@/components/ui/button";
import { getRandomQuote } from "@/lib/quote";
import { Quote } from "@/types/quote";
import { useEffect, useState } from "react";
import { TestInput } from "./TestInput";

export function TestClient() {
  const [randomQuote, setRandomQuote] = useState<Quote | undefined>(undefined);
  const [testStarted, setTestStarted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isTestFinished, setIsTestFinished] = useState<boolean>(false);
  useEffect(() => {
    getRandomQuote().then((response) => {
      if ("data" in response) {
        setRandomQuote(response.data);
      } else {
        setErrorMessage(response.message!);
      }
    });
  }, []);

  return (
    <div className="flex flex-col w-full gap-8 items-center">
      <p>
        Click on "Start Test" to generate a random text and test your writing
        speed!
      </p>

      <div className="flex flex-col w-full items-center">
        {testStarted ? (
          !errorMessage && randomQuote ? (
            <div className="flex flex-col w-full items-center">
              <p>{randomQuote.paragraph}</p>
              <TestInput
                quote={randomQuote.paragraph}
                setIsTestFinished={setIsTestFinished}
              />
            </div>
          ) : (
            <p>Loading...</p>
          )
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
