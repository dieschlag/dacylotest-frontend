import { useEffect, useRef, useState } from "react";
import { ChangeEvent } from "react";

type TestInputProps = {
  quote: string;
  setIsTestFinished: (value: boolean) => void;
};

export function TestInput({ quote, setIsTestFinished }: TestInputProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false); // ← la vraie source de vérité
  const [elapsed, setElapsed] = useState<number>(0);
  function verifyWord(e: ChangeEvent<HTMLInputElement>) {
    if (!runningRef.current && e.currentTarget.value.length > 0) {
      runningRef.current = true;
      startTimeRef.current = performance.now();
      tick();
    }

    const input = e.currentTarget.value;
    const textLength = input.length;

    if (textLength + currentIndex <= quote.length) {
      console.log(
        "Potential futur element to display",
        quote.slice(currentIndex, currentIndex + textLength)
      );
      if (quote.slice(currentIndex, currentIndex + textLength) === input) {
        setCurrentIndex(currentIndex + input.length);
        e.currentTarget.value = "";
        console.log("to display as valid: ", quote.slice(0, currentIndex));
      }
    }
  }

  const tick = () => {
    if (!runningRef.current) return;
    if (startTimeRef.current === null) {
      startTimeRef.current = performance.now();
      tick();
    } else {
      rafRef.current = requestAnimationFrame(() => {
        if (startTimeRef.current !== null) {
          const now = performance.now();
          setElapsed(now - startTimeRef.current);
          tick(); // boucle
        }
      });
    }
  };

  const stopChrono = () => {
    runningRef.current = false;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  useEffect(() => {
    if (currentIndex === quote.length) {
      stopChrono();
    }
  }, [currentIndex]);

  useEffect(() => {
    console.log("elapsed", elapsed);
  }, [elapsed]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center border border-gray-300 rounded-md px-2">
        <p className="text-base text-green-400 font-bold">
          {quote.slice(0, currentIndex)}
        </p>
        <input
          type="text"
          onChange={(e) => verifyWord(e)}
          className="bg-transparent w-60 text-black font-mono text-base py-2 focus:outline-none"
        />
      </div>
      <div className="flex flex-row">
        <span>Time spent: </span>
        <span>{elapsed / 1000}</span>
      </div>
    </div>
  );
}
