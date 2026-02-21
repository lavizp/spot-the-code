import { randomBytes } from 'node:crypto';
export function createGameId() {
  return randomBytes(4).toString('hex').slice(0,7)
}
console.log(createGameId())