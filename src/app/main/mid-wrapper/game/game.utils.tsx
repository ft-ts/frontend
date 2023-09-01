const options = {
  timeZone : 'Asia/Seoul',
}

export const formatTime = (time : Date) : string => {
  const date = new Date(time);
  return date.toLocaleString('en-US', options);
}
