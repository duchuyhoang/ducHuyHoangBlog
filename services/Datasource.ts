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

export class Datasource {
  static repositories: Map<COLLECTION_NAMES, Repository<any>> = new Map()
  private db: Firestore
  private firebaseApp: FirebaseApp

  constructor(private readonly crescential: FirebaseOptions) {
    this.firebaseApp = initializeApp(this.crescential)
    console.log(this.firebaseApp)
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

  public getRepository(
    collectionName: COLLECTION_NAMES
  ): Repository<any> | undefined {
    console.log('xxx', Datasource.repositories)
    return Datasource.repositories.get(collectionName)
  }
}
