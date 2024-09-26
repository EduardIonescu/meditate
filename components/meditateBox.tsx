'use client';

import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';

type Modes = '4-7-8' | 'box';
type Actions = 'inhale' | 'hold_inhale' | 'exhale' | 'hold_exhale';
type ActionsMap = { [action in Actions]?: number };

type UserActions = 'Inhale' | 'Hold' | 'Exhale';
type UserActionsMap = { [action in Actions]?: UserActions };

const modes: { [mode in Modes]: ActionsMap } = {
  '4-7-8': { inhale: 4, hold_inhale: 7, exhale: 8 },
  box: { inhale: 4, hold_inhale: 4, exhale: 4, hold_exhale: 4 }
};

const dictionary: UserActionsMap = {
  inhale: 'Inhale',
  hold_inhale: 'Hold',
  exhale: 'Exhale',
  hold_exhale: 'Hold'
};

function MeditateBox() {
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState<'4-7-8' | 'box'>('4-7-8');

  const [action, setAction] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  useEffect(() => {
    const currentMode = modes[mode];
    while (started) {
      for (const [key, duration] of Object.entries(currentMode)) {
        console.log('we here');
        const actionKey = key as Actions;
        const userAction = dictionary[actionKey];
        const timer = setTimeout(() => {
          userAction && setAction(userAction);
        }, duration * 1000);

        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [started, mode]);
  const handleClick = () => {
    setStarted((prev) => !prev);
  };
  const handleChange = (value: string) => {
    if (value !== '4-7-8' && value !== 'box') {
      return;
    }
    setMode(value);
  };

  return (
    <article className="relative flex h-56 w-full items-center justify-center rounded-xl border-2 border-white/15 text-xl">
      {started ? (
        <div
          style={{
            transitionProperty: 'width, height',
            transitionTimingFunction: 'ease',
            transitionDuration: 4 + 's'
          }}
          className={`${started ? 'h-32 w-32' : 'h-24 w-24'} flex items-center justify-center rounded-full border-2`}
        >
          {action}
        </div>
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
          </SelectContent>
        </Select>

        <button
          onClick={handleClick}
          className="group rounded-md bg-white/5 px-3 transition-colors duration-200 ease-linear hover:bg-white/15"
        >
          <div className="rounded-xs ml-0.5 h-0 w-0 scale-75 border-b-8 border-l-[14px] border-t-8 border-b-transparent border-l-white/50 border-t-transparent transition-colors duration-200 ease-linear group-hover:border-l-white/80" />
        </button>
      </article>
    </article>
  );
}

export default MeditateBox;
