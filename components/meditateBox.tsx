'use client';

import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';

type Modes = '4-7-8' | 'box' | 'diaphragm' | 'pursed-lip' | 'resonant';
type Actions = 'inhale' | 'hold_inhale' | 'exhale' | 'hold_exhale';
type ActionsMap = { [action in Actions]?: number };

type UserActions = 'Inhale' | 'Hold' | 'Exhale';
type UserActionsMap = { [action in Actions]?: UserActions };

const modes: { [mode in Modes]: ActionsMap } = {
  '4-7-8': { inhale: 4, hold_inhale: 7, exhale: 8 },
  box: { inhale: 4, hold_inhale: 4, exhale: 4, hold_exhale: 4 },
  diaphragm: { inhale: 4, exhale: 6 },
  'pursed-lip': { inhale: 2, exhale: 4 },
  resonant: { inhale: 5, exhale: 5 }
};

const dictionary: UserActionsMap = {
  inhale: 'Inhale',
  hold_inhale: 'Hold',
  exhale: 'Exhale',
  hold_exhale: 'Hold'
};

function MeditateBox() {
  const [started, setStarted] = useState(false);
  const [select, setSelect] = useState<Modes>('4-7-8');
  const mode = Object.entries(modes[select]) as [Actions, number][];
  console.log(mode);
  const [transition, setTransition] = useState({
    duration: mode[0]![1],
    isFirstTime: true
  });

  const defaultCounter = {
    action: mode[0]![0],
    timer: mode[0]![1],
    index: 0
  };

  const [counter, setCounter] = useState(defaultCounter);

  const updateTransitionDuration = (duration: number) => {
    setTransition((prev) => ({ ...prev, duration }));
  };

  const updateFirstTime = (bool: boolean) => {
    setTransition((prev) => ({ ...prev, isFirstTime: bool }));
  };

  const decrementCounterTimer = () => {
    setCounter((prev) => ({ ...prev, timer: prev.timer - 1 }));
  };

  const handleStart = () => {
    if (started === true) {
      setCounter(defaultCounter);
      updateFirstTime(true);
    }
    setStarted((prev) => !prev);
  };

  const handleChange = (value: string) => {
    if (
      value !== '4-7-8' &&
      value !== 'box' &&
      value !== 'diaphragm' &&
      value !== 'pursed-lip' &&
      value !== 'resonant'
    ) {
      return;
    }
    setSelect(value);
  };

  useEffect(() => {
    if (!started) {
      return;
    }

    const interval = setInterval(() => {
      // just for ts to stop crying
      if (counter.timer === undefined) {
        return;
      }

      if (counter.timer === 0) {
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
      transition.isFirstTime && updateFirstTime(false);
    }, 1000);

    return () => clearInterval(interval);
  }, [started, counter.timer]);

  console.log(counter);

  let isBorderBig = false;
  const shouldBorderBeBig =
    started &&
    (counter.action === 'inhale' || counter.action === 'hold_inhale');

  if (shouldBorderBeBig && !transition.isFirstTime) {
    isBorderBig = true;
  } else {
    isBorderBig = false;
  }

  return (
    <article className="relative flex h-56 w-full items-center justify-center rounded-xl border-2 border-white/15 text-xl">
      {started ? (
        <>
          <div
            style={{
              transitionProperty: 'transform',
              transitionTimingFunction: 'linear',
              transitionDuration: transition.duration + 's'
            }}
            className={`${isBorderBig ? 'scale-150' : 'scale-100'} absolute h-24 w-24 rounded-full border-2 border-white`}
          />
          <div className="flex items-center justify-center">
            {dictionary[counter.action]}
          </div>
        </>
      ) : (
        'Paused'
      )}

      <article className="absolute -bottom-6 flex w-3/4 gap-2 rounded-md border border-neutral-800 bg-background py-1.5 pr-1.5">
        <Select onValueChange={handleChange}>
          <SelectTrigger className="h-8 w-full border-none">
            <SelectValue placeholder="4-7-8 Breathing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4-7-8">4-7-8 Breathing</SelectItem>
            <SelectItem value="box">Box Breathing</SelectItem>
            <SelectItem value="diaphragm">Diaphragmatic Breathing</SelectItem>
            <SelectItem value="pursed-lip">Pursed Lip Breathing</SelectItem>
            <SelectItem value="resonant">Resonant Breathing</SelectItem>
          </SelectContent>
        </Select>

        <button
          onClick={handleStart}
          className="group rounded-md bg-white/5 px-3 transition-colors duration-200 ease-linear hover:bg-white/15"
        >
          <div className="rounded-xs ml-0.5 h-0 w-0 scale-75 border-b-8 border-l-[14px] border-t-8 border-b-transparent border-l-white/50 border-t-transparent transition-colors duration-200 ease-linear group-hover:border-l-white/80" />
        </button>
      </article>
    </article>
  );
}

export default MeditateBox;
