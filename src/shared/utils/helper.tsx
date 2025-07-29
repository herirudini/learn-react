export const extractNumbers = (str: string): number => { 
  return Number(str.match(/\d+/g)?.join('')) || 0
}; // "get numbers from string"