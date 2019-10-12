import { Context as KoaContext } from 'koa'
import { Session } from 'koa-session'

// declare module 'koa-session' {
//   interface Session {
//     count: number
//   }
// }

interface MySession extends Session {
  count?: number
}

export interface Context extends KoaContext {
  session: MySession
}