import { BreathingDictionary } from '@/utils/constants';
import { Actions, Transition } from '@/utils/types';

type ActionMessageProps = {
  started: boolean;
  transition: Transition;
  isBorderBig: boolean;
  action: Actions;
};

function ActionMessage({
  started,
  transition,
  isBorderBig,
  action
}: ActionMessageProps) {
  if (!started) {
    return <>Paused</>;
  }

  return (
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
        {BreathingDictionary[action]}
      </div>
    </>
  );
}

export default ActionMessage;
