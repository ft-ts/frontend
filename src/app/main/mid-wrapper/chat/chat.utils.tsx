
const options = {
  timeZone: "Asia/Seoul",
}

export function formatTime(time: Date) {
  const date = new Date(time);
  return date.toLocaleString("en-US", options);
}