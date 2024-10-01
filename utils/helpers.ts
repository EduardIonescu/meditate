export const formatClock = (secondsSinceStart: number) => {
  const minutes = Math.floor(secondsSinceStart / 60);
  const seconds = secondsSinceStart % 60;
  const stringMinutes = minutes.toString().padStart(2, '0');
  const stringSeconds = seconds.toString().padStart(2, '0');

  return stringMinutes + ':' + stringSeconds;
};
