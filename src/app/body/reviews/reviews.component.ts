import {Component, Input} from '@angular/core';

import 'rxjs/add/operator/switchMap';
// import {MdTabGroup} from "@angular/material";
import {BodyComponent} from "../body.component";
import {Review} from "../../../services/data";
import {applySourceSpanToExpressionIfNeeded} from "@angular/compiler/src/output/output_ast";
import {count} from "rxjs/operator/count";
import {convertValueToOutputAst} from "@angular/compiler/src/output/value_util";


@Component({
    selector: 'app-reviews',
    templateUrl: 'reviews.component.html',
    styleUrls: ['reviews.component.css'],
})


export class ReviewsComponent extends BodyComponent {

  private videoUrl = "okokokokok";


  updateVideoURL(videoUrl: string) {
    this.videoUrl = videoUrl;
    console.log("URL:ssssssss " + this.videoUrl);
  }

    addReview(type: string, referenceUrl: string, description: string ): void {
        if ( !referenceUrl || !type) { return; }
        if ( !description ) { description = ''; }

        const review: Review = new Review();


        review.type = 'POSITIVE';
        review.referenceUrl = referenceUrl;
        review.reviewedMediaUrl = this.videoUrl;
        review.reviewedTimes = 0;
        review.description = description;

        console.log(JSON.stringify(review));

        this.reviewService.create(review)
          .then( r => {
            this.reviewList.push(r);
            this.updateLists();
          });


        //
        //   {
        //     id: Date.now(),
        //     type: type.toUpperCase,
        //     referenceUrl: referenceUrl,
        //     reviewedMediaUrl: "L3cpFYNPYz8",
        //     reviewedTimes: 0,
        //     description: description,
        // };


    }


}
// id: number;
// type: string;
// referenceUrl: string;
// reviewedMediaUrl: string;
// reviewedTimes: number;
// description: string;
