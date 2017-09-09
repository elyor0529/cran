import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute,  ParamMap, Params, NavigationExtras} from '@angular/router';

import {ICranDataService} from '../icrandataservice';
import {CRAN_SERVICE_TOKEN} from '../cran-data.servicetoken';
import {QuestionListEntry} from '../model/questionlistentry';
import {SearchQParameters} from '../model/searchqparameters';
import {PagedResult} from '../model/pagedresult';
import {NotificationService} from '../notification.service';

@Component({
  selector: 'app-search-questions',
  templateUrl: './search-questions.component.html',
  styleUrls: ['./search-questions.component.css']
})
export class SearchQuestionsComponent implements OnInit {

  private pagedResult: PagedResult<QuestionListEntry> = new PagedResult<QuestionListEntry>();
  private search = new SearchQParameters();

  constructor(@Inject(CRAN_SERVICE_TOKEN) private cranDataServiceService: ICranDataService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService) {

      this.activeRoute.queryParams.subscribe((params: ParamMap)  => {
        this.handleRouteChanged(params);
      });
  }

  private async handleRouteChanged(params: ParamMap): Promise<void> {

    this.search.page = +params['pageNumber'];
    this.search.title = params['title'];

    const andTagsJson = params['andTags'];
    const orTagsJson = params['orTags'];

    if (andTagsJson) {
      this.search.andTags = JSON.parse(andTagsJson);
    }
    if (orTagsJson) {
      this.search.orTags = JSON.parse(orTagsJson);
    }
    if (isNaN(this.search.page)) {
      this.search.page = 0;
    }
    try {
      this.notificationService.emitLoading();
      this.pagedResult = await this.cranDataServiceService.searchForQuestions(this.search);
      this.notificationService.emitDone();
    } catch (error) {
      this.notificationService.emitError(error);
    }
  }

  ngOnInit() {

  }

  public searchQuestions(pageNumber: number) {

    const andTags: string = JSON.stringify(this.search.andTags);
    const orTags: string = JSON.stringify(this.search.orTags);

    const navigationExtras: NavigationExtras = {
      queryParams: {
         pageNumber: pageNumber,
         title: this.search.title,
         andTags: andTags,
         orTags: orTags,
      }
    };

    this.router.navigate(['/searchq'], navigationExtras);
  }

  public pageSelected(pageNumber: number) {
    this.searchQuestions(pageNumber);
  }

  public goToQuestion(question: QuestionListEntry) {
    if(question.status === 1) {
      this.router.navigate(['/viewquestion', question.id]);
    } else {
      this.router.navigate(['/editquestion', question.id]);
    }
  }

  public deleteQuestion(question: QuestionListEntry) {
    if (confirm('Frage löschen?')) {
      this.cranDataServiceService.deleteQuestion(question.id)
        .then(nores => this.searchQuestions(this.pagedResult.currentPage));
    }
  }

}
