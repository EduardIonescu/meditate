'use client';

import { MODES } from '@/utils/constants';
import { useClock, useCounter, useSelect, useTransition } from '@/utils/hooks';
import { Actions } from '@/utils/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ActionMessage from './actionMessage';
import Clock from './clock';
import ProgressBar from './progressBar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';

function MeditateBox() {
  const [started, setStarted] = useState(false);
  const { select, handleSelectChange } = useSelect('4-7-8');
  const { name, description, actionsMap } = MODES[select];
  const mode = Object.entries(actionsMap) as [Actions, number][];

  const { formattedClock, incrementClock } = useClock();

  const defaultCounter = { action: mode[0]![0], timer: mode[0]![1], index: 0 };
  const { counter, setCounter, decrementCounterTimer } =
    useCounter(defaultCounter);

  const defaultTransition = { duration: mode[0]![1], isFirstTime: true };
  const { transition, updateTransitionDuration, updateFirstTime, isBorderBig } =
    useTransition(defaultTransition, started, counter.action);

  const handleStart = () => {
    if (started === true) {
      setCounter(defaultCounter);
      updateFirstTime(true);
    }
    setStarted((prev) => !prev);
  };

  useEffect(() => {
    if (!started) {
      return;
    }

    // without a timeout it just makes the circle big from the strart
    const timeout = setTimeout(() => {
      if (transition.isFirstTime) {
        updateFirstTime(false);
      }
    }, 1);

    const interval = setInterval(() => {
      // just for ts to stop crying
      if (counter.timer === undefined) {
        return;
      }

      incrementClock();

      if (counter.timer === 1) {
        // reset to first action
        if (counter.index >= mode.length - 1) {
          setCounter(defaultCounter);
          updateTransitionDuration(defaultCounter.timer);

          return;
        }

        // go to next action
        const index = counter.index + 1;
        const timer = mode[index]![1];
        setCounter({ action: mode[index]![0], timer, index });
        updateTransitionDuration(timer);

        return;
      }

      decrementCounterTimer();
      if (transition.isFirstTime) {
        updateFirstTime(false);
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [started, counter.timer]);

  return (
    <section className="w-phone sm:w-app">
      <article className="rounded-xl border-x-[1px] border-b-[1px] border-white/5">
        <article className="relative flex h-56 w-full items-center justify-center rounded-xl border-2 border-white/15 text-xl">
          <Clock formattedClock={formattedClock} />

          {started && (
            <ProgressBar
              duration={actionsMap[counter.action]!}
              durationLeft={counter.timer}
            />
          )}

          <ActionMessage
            started={started}
            transition={transition}
            isBorderBig={isBorderBig}
            action={counter.action}
          />

          <article className="absolute -bottom-6 flex w-3/4 gap-2 rounded-md border border-neutral-800 bg-background bg-gradient-to-r from-neutral-600/20 via-neutral-900/20 to-neutral-900/20 py-1.5 pr-1.5">
            <div className="absolute -top-[1px] left-[10%] h-0.5 w-3/4 bg-gradient-to-r from-white/5 from-10% via-white/80 via-70% to-white/5 opacity-25" />

            <Select onValueChange={handleSelectChange} disabled={started}>
              <SelectTrigger
                className={`h-8 w-full border-none bg-transparent disabled:cursor-default`}
              >
                <SelectValue placeholder="4-7-8 Breathing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4-7-8">4-7-8 Breathing</SelectItem>
                <SelectItem value="box">Box Breathing</SelectItem>
                <SelectItem value="diaphragm">
                  Diaphragmatic Breathing
                </SelectItem>
                <SelectItem value="pursed-lip">Pursed Lip Breathing</SelectItem>
                <SelectItem value="resonant">Resonant Breathing</SelectItem>
              </SelectContent>
            </Select>

            <button
              onClick={handleStart}
              className="group rounded-md bg-white/5 px-3 transition-colors duration-200 ease-linear hover:bg-white/15"
            >
              {started ? (
                <div className="relative h-4 w-4">
                  <Image
                    src="/icons/retry-icon.svg"
                    fill
                    sizes="100%"
                    alt=""
                    aria-hidden
                    className="object-contain invert-[60%] transition-all duration-200 ease-linear group-hover:invert-[85%]"
                  />
                </div>
              ) : (
                <div className="rounded-xs ml-0.5 h-0 w-0 scale-75 border-b-8 border-l-[14px] border-t-8 border-b-transparent border-l-white/50 border-t-transparent transition-colors duration-200 ease-linear group-hover:border-l-white/80" />
              )}
            </button>
          </article>
        </article>
        <p className="mt-6 p-6 text-sm">
          <strong>{name}:</strong>{' '}
          <span className="opacity-60">{description}</span>
        </p>
      </article>
    </section>
  );
}

export default MeditateBox;
