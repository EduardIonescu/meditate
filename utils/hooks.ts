import { useRef, useState } from 'react';
import { formatClock } from './helpers';
import { Actions, BreathingType, Transition } from './types';

export const useSelect = (defaultValue: BreathingType) => {
  const [select, setSelect] = useState(defaultValue);

  const handleSelectChange = (value: string) => {
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

  return { select, handleSelectChange };
};

export const useTransition = (
  defaultValue: Transition,
  started: boolean,
  action: Actions
) => {
  const [transition, setTransition] = useState(defaultValue);

  const updateTransitionDuration = (duration: number) => {
    setTransition((prev) => ({ ...prev, duration }));
  };

  const updateFirstTime = (bool: boolean) => {
    setTransition((prev) => ({ ...prev, isFirstTime: bool }));
  };

  let isBorderBig = false;
  const shouldBorderBeBig =
    started && (action === 'inhale' || action === 'hold_inhale');

  if (shouldBorderBeBig && !transition.isFirstTime) {
    isBorderBig = true;
  } else {
    isBorderBig = false;
  }

  return { transition, updateTransitionDuration, updateFirstTime, isBorderBig };
};

export const useClock = () => {
  const secondsSinceStart = useRef(0);

  const formattedClock = formatClock(secondsSinceStart.current);

  const incrementClock = () => {
    secondsSinceStart.current++;
  };

  return { formattedClock, incrementClock };
};

type Counter = { action: Actions; timer: number; index: number };
export const useCounter = (defaultValue: Counter) => {
  const [counter, setCounter] = useState(defaultValue);

  const decrementCounterTimer = () => {
    setCounter((prev) => ({ ...prev, timer: prev.timer - 1 }));
  };

  return { counter, setCounter, decrementCounterTimer };
};
