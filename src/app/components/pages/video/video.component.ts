import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { VideosService } from "src/app/services/videos/videos.service";

@Component({
	selector: "app-video",
	templateUrl: "./video.component.html",
	styleUrls: ["./video.component.sass"]
})
export class VideoComponent implements OnInit {
	loading: boolean = true;
	id = this.route.snapshot.paramMap.get("id");
	video: any;
	videoLikes: Number;
	userLogin: boolean = false;
	videoUrl: string;
	uploadedByCurrentUser: boolean = false;
	user: any;
	deleted: boolean = false;
	videoExists: boolean;
	constructor(
		private videosService: VideosService,
		private storage: AngularFireStorage,
		public afAuth: AngularFireAuth,
		private route: ActivatedRoute
	) {
		this.afAuth.authState.subscribe(auth => {
			if (auth) this.user = auth;
		});
	}

	ngOnInit() {
		this.videosService.getVideo(this.id).subscribe(video => {
			if (video == null) {
				this.videoExists = false;
			} else {
				this.videoExists = true;
				this.video = video;
				this.videoLikes = video.likes.length;
				if (this.user && this.user.uid === this.video.user) {
					this.uploadedByCurrentUser = true;
				}
				var videoRef = this.storage.ref(video.path);
				videoRef.getDownloadURL().subscribe(url => {
					this.videoUrl = url;
					this.loading = false;
				});
			}
		});
	}

	likeVideo() {
		if (this.user) {
			this.videosService.likeVideo(this.id);
		} else {
			this.userLogin = true;
		}
	}

	deleteVideo() {
		this.videosService.deleteVideo(this.id, this.video.path);
		this.videoExists = false;
	}
}
