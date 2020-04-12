import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/pages/home/home.component";
import { PageNotFoundComponent } from "./components/pages/page-not-found/page-not-found.component";
import { VideoComponent } from "./components/pages/video/video.component";
import { VideosListComponent } from "./components/pages/videos-list/videos-list.component";
import { UserProfileComponent } from "./components/pages/user-profile/user-profile.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { SignupComponent } from "./components/pages/signup/signup.component";
import { UploadVideoComponent } from "./components/pages/upload-video/upload-video.component";

import { AuthGuard } from "./guard/auth/auth.guard";

const routes: Routes = [
	{
		path: "",
		component: HomeComponent
	},
	{ path: "allvideos", component: VideosListComponent },
	{
		path: "profile",
		component: UserProfileComponent,
		canActivate: [AuthGuard]
	},
	{ path: "login", component: LoginComponent },
	{ path: "signup", component: SignupComponent },
	{
		path: "uploadvideo",
		component: UploadVideoComponent,
		canActivate: [AuthGuard]
	},
	{ path: "vid/:id", component: VideoComponent },
	{ path: "**", component: PageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
