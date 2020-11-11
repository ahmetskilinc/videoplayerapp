import { Injectable } from "@angular/core";
import {
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
	providedIn: "root",
})
export class VideosService {
	videosCollection: AngularFirestoreCollection<any>;
	videos: Observable<any[]>;
	videoDoc: AngularFirestoreDocument<any>;

	userId: String;
	constructor(
		public afs: AngularFirestore,
		private storage: AngularFireStorage,
		private firebaseAuth: AngularFireAuth
	) {
		this.videosCollection = this.afs.collection("videos");
		this.firebaseAuth.authState.subscribe((user) => {
			if (user) this.userId = user.uid;
		});
	}

	getAllVideos() {
		return this.videosCollection.snapshotChanges().pipe(
			map((changes) => {
				return changes.map((a) => {
					const data = a.payload.doc.data();
					data.id = a.payload.doc.id;
					return data;
				});
			})
		);
	}

	likeVideo(videoId) {
		this.videosCollection
			.doc(`${videoId}/likes`)
			.snapshotChanges()
			.subscribe((likes) => {
				console.log(likes);
			});
	}

	getVideo(videoId) {
		return this.afs.doc<any>(`videos/${videoId}`).valueChanges();
	}

	deleteVideo(videoId: string, videoPath: string) {
		this.storage.ref(videoPath).delete();
		this.videosCollection.doc<any>(videoId).delete();
	}
}
