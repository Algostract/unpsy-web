export default function (dateTime: string | Date) {
  if (typeof dateTime === 'string') dateTime = new Date(dateTime)

  return new Date().getTime() > dateTime.getTime()
}
