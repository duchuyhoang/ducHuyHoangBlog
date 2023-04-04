import { DocumentReference } from 'firebase/firestore/lite'
import { BaseModel } from './BaseModel'
import { User } from './User'
export interface Comment {
  content: string
  user: User
  postSlug: string
  createAt: string
}

export interface CommentWithDocId extends Comment {
  docId: string
}

export interface IAddComment extends Omit<Comment, 'user'> {
  user: DocumentReference<User>
}
