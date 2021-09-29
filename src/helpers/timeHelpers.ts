import moment from "moment"

export const millis2clock = (millis: number) : string => {
  if (millis > 0)
    return moment(millis).format('mm:ss')
  else
    return '00:00'
}