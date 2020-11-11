import { Component, OnInit } from "@angular/core";
import { VideosService } from "../../../services/videos/videos.service";

@Component({
	selector: "app-videos-list",
	templateUrl: "./videos-list.component.html",
	styleUrls: ["./videos-list.component.sass"]
})
export class VideosListComponent implements OnInit {
	videos: any[];
	loading: boolean = true;

	constructor(private videosService: VideosService) {}

	ngOnInit() {
		this.videosService.getAllVideos().subscribe(videos => {
			this.videos = videos;
			this.loading = false;
		});
	}
}
