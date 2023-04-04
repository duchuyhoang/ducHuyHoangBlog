/* eslint-disable @typescript-eslint/return-await */
import {
  CollectionReference,
  QueryConstraint,
  DocumentData,
  getDocs,
  getDoc,
  query,
  where,
  addDoc,
  Firestore,
  doc,
  DocumentReference,
  DocumentSnapshot,
  deleteDoc,
  updateDoc,
  UpdateData
} from 'firebase/firestore/lite'
import { BaseModel } from './model/BaseModel'

// interface IRepository<T> {
//   db: Firestore
//   collection: CollectionReference<T>
// }

export class Repository<T extends DocumentData> {
  constructor(
    private readonly db: Firestore,
    private readonly collection: CollectionReference<T>
  ) {}

  public async getAll(
    ...queryConstraints: QueryConstraint[]
  ): Promise<Array<DocData<T>>> {
    const q = query(this.collection, ...queryConstraints)
    const snapshot = await getDocs<T>(q)
    return snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }))
  }

  public async getById(id: string): Promise<Maybe<DocumentSnapshot<T>>> {
    const docRef = await doc(this.db, this.collection.id, id)
    try {
      const docSnap = await getDoc<T>(docRef as DocumentReference<T>)
      if (docSnap.exists()) {
        return docSnap
      } else {
        return null
      }
    } catch (e) {
      return null
    }
  }

  public async getReference(
    ...pathSegment: string[]
  ): Promise<DocumentReference<T>> {
    return (await doc(
      this.db,
      this.collection.id,
      ...pathSegment
    )) as DocumentReference<T>
  }

  public async getDataByReference(
    ref: DocumentReference<T>
  ): Promise<Maybe<T>> {
    const data = await getDoc(ref)
    if (data.exists()) {
      return data.data()
    } else return null
  }

  public async addOne(data: T): Promise<DocumentReference<T>> {
    const docRef = await addDoc<T>(this.collection, data)
    // const dd = await getDoc(docRef)
    return docRef
  }

  public async deleteById(id: string): Promise<void> {
    const docRef = await this.getReference(id)
    return await deleteDoc(docRef)
  }

  public async updateOne(id: string, data: UpdateData<T>): Promise<void> {
    const docRef = await this.getReference(id)
    return await updateDoc(docRef, data)
  }
}
