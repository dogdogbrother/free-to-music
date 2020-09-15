import { UserState } from '@/models/user'

export interface IConment {
  id: number
  content: string
  squareId: string
  user: UserState
  userId: string
  createdAt: string
}

export interface IHttpRes {
  code: number
  data: any
}