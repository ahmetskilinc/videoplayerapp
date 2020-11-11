import { Component, OnInit } from "@angular/core";
import {
	AngularFireStorage,
	AngularFireUploadTask
} from "@angular/fire/storage";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
	selector: "app-upload-video",
	templateUrl: "./upload-video.component.html",
	styleUrls: ["./upload-video.component.sass"]
})
export class UploadVideoComponent implements OnInit {
	task: AngularFireUploadTask;
	percentage: Observable<number>;
	snapshot: Observable<any>;
	downloadURL: Observable<string>;
	isHovering: boolean;
	user: any;
	videoUploaded: boolean = false;
	videoTitle: FormGroup;
	videoId: string;
	titleSet: boolean = false;
	videoPath: string;

	constructor(
		private storage: AngularFireStorage,
		private afs: AngularFirestore,
		private afAuth: AngularFireAuth,
		private fb: FormBuilder
	) {}

	ngOnInit() {
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.user = user;
			}
		});
	}

	toggleHover(event: boolean) {
		this.isHovering = event;
	}

	startUpload(event: FileList) {
		const file = event.item(0);

		if (file.type.split("/")[0] !== "video") {
			console.error("unsupported file type :( ");
			return;
		}

		const path = `videos/${new Date().getTime()}_${file.name}`;

		this.task = this.storage.upload(path, file);
		this.percentage = this.task.percentageChanges();
		this.snapshot = this.task.snapshotChanges().pipe(
			tap(snap => {
				if (snap.bytesTransferred === snap.totalBytes) {
					this.afs
						.collection("videos")
						.add({
							path: path,
							size: snap.totalBytes,
							user: this.user.uid,
							type: file.type,
							likes: [],
							dislikes: []
						})
						.then(video => {
							this.videoId = video.id;
							this.videoPath = video.path;
							this.buildForm();
							this.videoUploaded = true;
						})
						.catch(function(error) {
							console.error("Error adding document: ", error);
						});
				}
			})
		);
	}

	setTitle() {
		this.afs.doc("videos/" + this.videoId).update(this.videoTitle.value);
		this.titleSet = true;
	}

	buildForm(): void {
		this.videoTitle = this.fb.group({
			title: ["", [Validators.required]]
		});
	}

	isActive(snapshot) {
		return (
			snapshot.state === "running" &&
			snapshot.bytesTransferred < snapshot.totalBytes
		);
	}
}
