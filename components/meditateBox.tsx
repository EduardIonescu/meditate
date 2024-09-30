'use client';

import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';

type BreathingType = '4-7-8' | 'box' | 'diaphragm' | 'pursed-lip' | 'resonant';
type Actions = 'inhale' | 'hold_inhale' | 'exhale' | 'hold_exhale';
type ActionsMap = { [action in Actions]?: number };
type BreathingData = {
  name: string;
  description: string;
  actionsMap: ActionsMap;
};

type UserActions = 'Inhale' | 'Hold' | 'Exhale';
type UserActionsMap = { [action in Actions]?: UserActions };

const modes: { [mode in BreathingType]: BreathingData } = {
  '4-7-8': {
    name: '4-7-8 Breathing',
    description:
      'Inhale for 4 seconds, hold the breath for 7 seconds and exhale for 8 seconds. This technique helps reduce stress and promote relaxation.',
    actionsMap: { inhale: 4, hold_inhale: 7, exhale: 8 }
  },
  box: {
    name: 'Box Breathing',
    description:
      'Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds and hold again for 4 seconds. It enhances focus and effectively calms the busy mind.',
    actionsMap: { inhale: 4, hold_inhale: 4, exhale: 4, hold_exhale: 4 }
  },
  diaphragm: {
    name: 'Diaphragmatic Breathing',
    description:
      'Inhale deeply, expanding the diaphragm, for 4 seconds and exhale for 6 seconds. This exercise improves lung efficiency and reduces stress.',
    actionsMap: { inhale: 4, exhale: 6 }
  },
  'pursed-lip': {
    name: 'Pursed Lip Breathing',
    description:
      'Inhale through the nose for 2 seconds, exhale slowly through pursed lips for 4 seconds. It helps slow down breathing and promotes relaxation.',
    actionsMap: { inhale: 2, exhale: 4 }
  },
  resonant: {
    name: 'Resonant Breathing',
    description:
      'Breathe in and out evenly, usually around 6 breaths per minute. This method balances the nervous system and improves emotional well-being.',
    actionsMap: { inhale: 5, exhale: 5 }
  }
};

const dictionary: UserActionsMap = {
  inhale: 'Inhale',
  hold_inhale: 'Hold',
  exhale: 'Exhale',
  hold_exhale: 'Hold'
};

function MeditateBox() {
  const [started, setStarted] = useState(false);
  const [select, setSelect] = useState<BreathingType>('4-7-8');
  const { name, description, actionsMap } = modes[select];
  const mode = Object.entries(actionsMap) as [Actions, number][];
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

    // without a timeout it just makes the circle big from the strart
    const timeout = setTimeout(() => {
      transition.isFirstTime && updateFirstTime(false);
    }, 1);

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

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
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
    <article className="rounded-xl border-x-[1px] border-b-[1px] border-white/5">
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
      <p className="mt-6 p-6 text-sm">
        <strong>{name}:</strong>{' '}
        <span className="opacity-60">{description}</span>
      </p>
    </article>
  );
}

export default MeditateBox;
