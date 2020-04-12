import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { VideosListComponent } from "./components/pages/videos-list/videos-list.component";
import { UserProfileComponent } from "./components/pages/user-profile/user-profile.component";
import { VideoComponent } from "./components/pages/video/video.component";
import { PageNotFoundComponent } from "./components/pages/page-not-found/page-not-found.component";
import { NavbarComponent } from "./components/layout/navbar/navbar.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { SignupComponent } from "./components/pages/signup/signup.component";
import { UploadVideoComponent } from "./components/pages/upload-video/upload-video.component";
import { VideoListItemComponent } from "./components/layout/video-list-item/video-list-item.component";

import { AuthService } from "./services/auth/auth.service";
import { DropZoneDirective } from "./services/drop-zone/drop-zone.directive";

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		VideosListComponent,
		UserProfileComponent,
		VideoComponent,
		PageNotFoundComponent,
		NavbarComponent,
		LoginComponent,
		SignupComponent,
		UploadVideoComponent,
		DropZoneDirective,
		VideoListItemComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireStorageModule
	],
	providers: [AuthService],
	bootstrap: [AppComponent]
})
export class AppModule {}
