export function minutesToHMS(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  const seconds = Math.round((totalMinutes - Math.floor(totalMinutes)) * 60);

  return { hours, minutes, seconds };
}
