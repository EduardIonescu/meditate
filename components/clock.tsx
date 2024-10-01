type ClockProps = { formattedClock: string };
function Clock({ formattedClock }: ClockProps) {
  return (
    <div className="absolute left-1 top-1 rounded-tl-lg bg-white/10 px-3 py-1 text-xs leading-4 opacity-75">
      {formattedClock}
    </div>
  );
}

export default Clock;
