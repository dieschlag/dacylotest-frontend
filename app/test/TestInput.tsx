import { useEffect, useRef, useState } from "react";
// import { ChangeEvent } from "react";
import { FormEvent } from "react";

type TestInputProps = {
  quote: string;
  setIsTestFinished: (value: boolean) => void;
};

export function TestInput({ quote, setIsTestFinished }: TestInputProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const [elapsed, setElapsed] = useState<number>(0);

  function verifyWord(e: FormEvent<HTMLSpanElement>) {
    let input = e.currentTarget.innerText;
    // input = input.replace(/\u00A0/g, " ").trimEnd();
    const textLength = input.length;
    console.log(input);
    if (!runningRef.current && textLength > 0) {
      runningRef.current = true;
      startTimeRef.current = performance.now();
      tick();
    }

    if (textLength + currentIndex <= quote.length) {
      console.log(
        "Potential futur element to display",
        quote.slice(currentIndex, currentIndex + textLength)
      );
      console.log(">>>>>>>>> Checking test \n \n");
      console.log(
        "Part of quote checked: ",
        quote.slice(currentIndex, currentIndex + textLength)
      );
      console.log("Part of span input checked: ", input, "\n");
      console.log(
        "Result of checking: ",
        quote.slice(currentIndex, currentIndex + textLength) === input
      );
      console.log("Comparing input to space:", input === " ");
      console.log("------------------ End ------------------------");

      if (quote.slice(currentIndex, currentIndex + textLength) === input) {
        setCurrentIndex(currentIndex + input.length);
        e.currentTarget.innerText = "";
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
    console.log(quote.slice(0, currentIndex));
  }, [currentIndex]);

  return (
    <div className="flex flex-col w-full items-center ">
      <p className="flex flex-wrap items-center border break-normal border-gray-300 rounded-md w-1/4 px-2">
        <span className="text-base text-green-400 w-fit font-bold whitespace-pre">
          {quote.slice(0, currentIndex)}
        </span>
        <span
          contentEditable="true"
          onInput={(e) => verifyWord(e)}
          className="flex-1 bg-transparent text-black break-normal font-mono break-words text-base w-fit whitespace-pre py-2 focus:outline-none"
        ></span>
      </p>
      <div className="flex flex-row gap-1">
        <span>Time spent: </span>
        <span className="w-[55px]">{elapsed / 1000}</span>
        <span>s</span>
      </div>
    </div>
  );
}
