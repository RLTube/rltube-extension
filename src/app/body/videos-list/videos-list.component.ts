import {Component, Input} from "@angular/core";
import {YoutubePlayerService} from "../../../services/youtube-player.service";
import {ReviewsComponent} from "../reviews/reviews.component";

@Component({
  selector: 'app-videos-list',
  templateUrl: 'videos-list.component.html',
  styleUrls: ['videos-list.component.css']
})

export class VideosListComponent {
  @Input() videoList;
  @Input() reviewService;

  // constructor() {}

  play(videoID: string): void {
    console.log("vid ID" + videoID as string);

    const currentVideo: HTMLIFrameElement = document.getElementById("current-video") as HTMLIFrameElement;
    currentVideo.setAttribute('src', 'https://www.youtube.com/embed/' + videoID);
    this.reviewService.getReviewList(videoID);
  }
}
