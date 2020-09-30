import { UserState } from '@/models/user'

export interface IConment {
  id: number
  content: string
  squareId: number
  user: UserState
  userId: string
  createdAt: string
  rootCommentId?: number
  subComment: IConment[]
}

export interface IHttpRes {
  code: number
  data: any
}