import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import {NotificationService} from "./notification.service";
import {YOUTUBE_API_KEY} from "./constants";

@Injectable()
export class YoutubeApiService {
  base_url = 'https://www.googleapis.com/youtube/v3/';
  max_results = 30;

  public nextToken: string;
  public lastQuery: string;

  constructor(private http: Http,
              private notificationService: NotificationService) {
  }

  searchVideos(query: string): Promise<any> {
    return this.http.get(this.base_url + 'search?q=' + query + '&maxResults='
      + this.max_results + '&type=video&part=snippet,id&key=' + YOUTUBE_API_KEY + '&videoEmbeddable=true')
      .map(response => {
        const jsonRes = response.json();
        const res = jsonRes['items'];
        this.lastQuery = query;
        this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;

        const ids = [];

        res.forEach((item) => {
          ids.push(item.id.videoId);
        });

        return this.getVideos(ids);
      })
      .toPromise()
      .catch(this.handleError);
  }

  // searchNext(): Promise<any> {
  //   return this.http.get(this.base_url + 'search?q=' + this.lastQuery + '&pageToken=' + this.nextToken + '&maxResults='
  //     + this.max_results + '&type=video&part=snippet,id&key=' + YOUTUBE_API_KEY + '&videoEmbeddable=true')
  //     .map(response => {
  //       const jsonRes = response.json();
  //       const res = jsonRes['items'];
  //       this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;
  //       const ids = [];
  //
  //       res.forEach((item) => {
  //         ids.push(item.id.videoId);
  //       });
  //
  //       return this.getVideos(ids);
  //     })
  //     .toPromise()
  //     .catch(this.handleError);
  // }

  getVideos(ids): Promise<any> {
    return this.http.get(this.base_url + 'videos?id=' + ids.join(',') + '&maxResults='
      + this.max_results + '&type=video&part=snippet,contentDetails,statistics&key=' + YOUTUBE_API_KEY)
      .map(results => {
        return results.json()['items'];
      })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    this.notificationService.showNotification(errMsg);
    return Promise.reject(errMsg);
  }
}
