import { FRAME_INTERVAL, MAX_WIDTH_PROGRESS_BAR } from '@/utils/constants';
import { useEffect, useRef } from 'react';

type ProgressBarProps = { duration: number; durationLeft: number };

function ProgressBar({ duration, durationLeft }: ProgressBarProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef(0);
  useEffect(() => {
    if (!divRef.current) {
      return;
    }
    if (duration === durationLeft) {
      widthRef.current = 0;
    }

    const increment =
      MAX_WIDTH_PROGRESS_BAR / ((duration * 1000) / FRAME_INTERVAL);

    const interval = setInterval(() => {
      widthRef.current += increment;
      divRef.current!.style.width = widthRef.current.toString() + 'px';
    }, FRAME_INTERVAL);

    return () => clearInterval(interval);
  }, [duration, durationLeft]);

  return (
    <div className="absolute top-2 mx-auto h-0.5 w-20 rounded-full bg-white/15">
      <div
        ref={divRef}
        className="absolute left-0 top-0 h-0.5 w-0 rounded-full bg-white/80"
      />
    </div>
  );
}

export default ProgressBar;
