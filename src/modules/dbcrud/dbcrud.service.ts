import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { isEmpty } from 'rxjs';

@Injectable()
export class DBCrudService {
	firestoreDB: Firestore;
	constructor() {
		this.firestoreDB = new Firestore({
			keyFilename: './Key.json',
			projectId: process.env.FIREBASE_APP_ID,
		});
	}

	async quickstart() {				// Simple reference for Insert, Update and delete for firestore docs.
		const document = this.firestoreDB.doc('posts/intro-to-firestore');
		// Enter new data into the document.
		await document.set({
			title: 'Welcome to Firestore',
			body: 'Hello World',
		});
		console.log('Entered new data into the document');

		// Update an existing document.
		await document.update({ body: 'My first Firestore app' });
		console.log('Updated an existing document');

		// Delete the document.
		await document.delete();
		console.log('Deleted the document');
	}

	async findAll(collStr: string, queryOpts: Object = {}, collRefOpts: Object = {}) {
		if (Object.keys(queryOpts).length == 0 && Object.keys(collRefOpts).length == 0) {
			const collRef: FirebaseFirestore.CollectionReference = this.firestoreDB.collection(collStr);
			const snapshot: FirebaseFirestore.QuerySnapshot = await collRef.get();
			return snapshot.docs.map(doc => doc.data())
		} else if (Object.keys(collRefOpts).length > 0) {
			const docRef: FirebaseFirestore.DocumentReference = this.firestoreDB.collection(collRefOpts['collection']).doc(collRefOpts['document'])
			const snapshot: FirebaseFirestore.QuerySnapshot = await this.firestoreDB.collection(collStr).where(collRefOpts['field'], '==', docRef).get()
			return snapshot.docs.map(doc => doc.data())
		} else if (Object.keys(queryOpts).length > 0) {
			const snapshot: FirebaseFirestore.QuerySnapshot = await this.firestoreDB.collection(collStr).where(collRefOpts['field'], collRefOpts['operator'], collRefOpts['value']).get()
			return snapshot.docs.map(doc => doc.data())
		}
		return { success: false, data: null }
	}

	async findItem(collStr: string, id: number): Promise<FirebaseFirestore.DocumentData> {
		const docRef: FirebaseFirestore.DocumentReference = this.firestoreDB.collection(collStr).doc(id.toString())
		const data: FirebaseFirestore.DocumentData = (await docRef.get()).data()
		return data;
	}
}