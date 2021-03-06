import * as _ from 'lodash'

export const newError = (msg: string): Error => new Error(msg)

export const lowerCase = (str: string): string => str.toLowerCase()

export const getTimestamp = (): number => Math.ceil(Date.now() / 1000)

export const helpCompareStr = (a: string, b: string): boolean => lowerCase(a) === lowerCase(b)

export const convertTrades = (trades => {
  return trades.map(item => {
    const { tradeType, payload } = item
    const rawOrder = JSON.stringify(payload)
    delete item.payload
    return {
      ...item,
      rawOrder,
      side: tradeType === 'ask' ? 'SELL' : (tradeType === 'bid' ? 'BUY' : ''),
    }
  })
})

// Only support object
export const lowerCaseObjValue = (obj: any): any => {
  const keys = _.keys(obj)
  const conf = {}

  keys.forEach(k => {
    const v = obj[k]

    if (_.isPlainObject(v)) {
      conf[k] = lowerCaseObjValue(v)

    } else if (_.isString(v)) {
      conf[k] = v.toLowerCase()

    } else {
      conf[k] = v
    }
  })

  return conf
}

export const leftPadWith0 = (str, len) => {
  str = str + ''
  len = len - str.length
  if (len <= 0) return str
  return '0'.repeat(len) + str
}