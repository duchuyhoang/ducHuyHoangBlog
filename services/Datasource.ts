/* eslint-disable @typescript-eslint/prefer-readonly */
import {
  collection,
  CollectionReference,
  doc,
  Firestore,
  getFirestore,
  writeBatch
} from 'firebase/firestore/lite'
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app'
import { COLLECTION_NAMES } from '../common/enum'
import { Repository } from './Repository'
import { BaseModel } from './model/BaseModel'
// import { User } from './model/User'
// import { Comment } from './model/Comment'

export class Datasource {
  static repositories: Map<COLLECTION_NAMES, Repository<any>> = new Map()
  static models: Map<COLLECTION_NAMES, Repository<any>> = new Map()
  private db: Firestore
  private firebaseApp: FirebaseApp

  constructor(private readonly crescential: FirebaseOptions) {
    this.firebaseApp = initializeApp(this.crescential)
    this.db = getFirestore(this.firebaseApp)
  }

  public addRepository<M extends Dictionary>(
    collectionName: COLLECTION_NAMES
  ): void {
    const newCollection = collection(
      this.db,
      collectionName.toString()
    ) as CollectionReference<M>
    Datasource.repositories.set(
      collectionName,
      new Repository<M>(this.db, newCollection)
    )
  }

  public getRepository<M extends Dictionary>(
    collectionName: COLLECTION_NAMES
  ): Repository<M> | undefined {
    return Datasource.repositories.get(collectionName) as Repository<M>
  }
}
