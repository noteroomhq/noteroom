import React, { useEffect, useRef, useState } from "react";

type OTPInputProps = {
  length?: number; // default 6
  value?: string; // controlled value (optional)
  onChange?: (value: string) => void; // every time value changes
  onComplete?: (value: string) => void; // called when all boxes filled
  // styling hooks
  inputClassName?: string;
  containerClassName?: string;
};

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value = "",
  onChange,
  onComplete,
  inputClassName = "",
  containerClassName = "",
}) => {
  // internal state when not fully controlled
  const [digits, setDigits] = useState<string[]>(
    Array.from({ length }, (_, i) => value[i] ?? "")
  );

  // refs for inputs for focus control
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Keep internal digits synced when parent changes value (controlled support)
  useEffect(() => {
    if (value) {
      const v = value.slice(0, length).split("");
      setDigits((prev) => {
        const newDigits = [...prev];
        for (let i = 0; i < length; i++) newDigits[i] = v[i] ?? "";
        return newDigits;
      });
    }
  }, [value, length]);

  // Helper: emit current joined value
  const emitChange = (arr: string[]) => {
    const joined = arr.join("");
    onChange?.(joined);
    if (joined.length === length && !arr.includes("")) {
      onComplete?.(joined);
    }
  };

  // When digits change internally, notify parent
  useEffect(() => {
    emitChange(digits);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  // Paste handler - distributes digits across boxes
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("Text");
    const onlyDigits = pasted.replace(/\D/g, "");
    if (!onlyDigits) return;

    const next = [...digits];
    for (let i = 0; i < length && i < onlyDigits.length; i++) {
      next[i] = onlyDigits[i];
    }
    setDigits(next);

    // focus the last filled or next
    const nextIndex = Math.min(onlyDigits.length, length - 1);
    inputsRef.current[nextIndex]?.focus();
    inputsRef.current[nextIndex]?.select();
  };

  // Single digit change
  const handleChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // only keep the last typed digit if user typed more than one char
    const digit = raw.replace(/\D/g, "").slice(-1) ?? "";

    setDigits((prev) => {
      const next = [...prev];
      next[idx] = digit;
      return next;
    });

    if (digit) {
      // move focus to next input
      const nextInput = inputsRef.current[idx + 1];
      if (nextInput) nextInput.focus();
    }
  };

  // Keydown for navigation and backspace behavior
  const handleKeyDown = (idx: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (key === "Backspace") {
      e.preventDefault();
      setDigits((prev) => {
        const next = [...prev];
        if (next[idx]) {
          // clear current if has value
          next[idx] = "";
          // keep focus here
          return next;
        } else {
          // move focus to previous and clear it
          const prevIndex = idx - 1;
          if (prevIndex >= 0) {
            inputsRef.current[prevIndex]?.focus();
            next[prevIndex] = "";
          }
          return next;
        }
      });
    } else if (key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = idx - 1;
      if (prevIndex >= 0) inputsRef.current[prevIndex]?.focus();
    } else if (key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = idx + 1;
      if (nextIndex < length) inputsRef.current[nextIndex]?.focus();
    } else if (key === "Enter") {
      // nothing special here — allow parent form submit if applicable
    }
  };

  return (
    <div className={`flex gap-2 ${containerClassName}`}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digits[i] ?? ""}
          onChange={handleChange(i)}
          onKeyDown={handleKeyDown(i)}
          onPaste={handlePaste}
          className={`w-12 h-12 text-center rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-lg ${inputClassName}`}
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
