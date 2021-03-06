import { Component, OnInit, Inject, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, } from '@angular/router';
import { HttpModule, } from '@angular/http';

import {ICranDataService} from '../icrandataservice';
import {CRAN_SERVICE_TOKEN} from '../cran-data.servicetoken';
import {NotificationService} from '../notification.service';
import {Question} from '../model/question';
import {CommentsComponent} from '../comments/comments.component';
import {VersionsComponent} from '../versions/versions.component';
import {LanguageService} from '../language.service';
import { ConfirmService } from '../confirm.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {

  @ViewChild('comments') comments: CommentsComponent;
  @ViewChild('versions') versions: VersionsComponent;

  public question: Question;

  constructor(@Inject(CRAN_SERVICE_TOKEN) private cranDataService: ICranDataService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private ls: LanguageService) {
      this.activeRoute.paramMap.subscribe((params: ParamMap)  => {
      const id = params.get('id');
      this.handleRouteChanged(+id);
    });
  }

  ngOnInit() {
  }

  public goToEditQuestion() {
    this.router.navigate(['/editquestion', this.question.id]);
  }

  private async createNewVersion() {
    // save current question
    try {
      await this.confirmService.confirm(this.ls.label('version'), this.ls.label('versionq'));
      this.notificationService.emitLoading();
      const newId = await this.cranDataService.versionQuestion(this.question.id);
      this.notificationService.emitDone();
      this.router.navigate(['/editquestion', newId]);
    } catch (error) {
      if (error === 'cancel') {
        // that is ok
      } else {
        this.notificationService.emitError(error);
      }
    }
  }

  private async copyQuestion() {
    if (this.question && this.question.id > 0) {
      try {
        await this.confirmService.confirm(this.ls.label('copyquestion'), this.ls.label('copyquestionq'));
        this.notificationService.emitLoading();
        const newQuestionId = await this.cranDataService.copyQuestion(this.question.id);
        this.notificationService.emitDone();
        this.router.navigate(['/editquestion', newQuestionId]);
      } catch (error) {
        if (error === 'cancel') {
          // that is ok
        } else {
          this.notificationService.emitError(error);
        }
      }
    }
  }

  private async accept() {
    if (this.question && this.question.id > 0) {
      // save current question
      try {
        await this.confirmService.confirm(this.ls.label('acceptquestion'), this.ls.label('acceptquestionq'));
        this.notificationService.emitLoading();
        await this.cranDataService.acceptQuestion(this.question.id);
        this.question = await this.cranDataService.getQuestion(this.question.id);
        await this.comments.showComments(this.question.id);
        this.notificationService.emitDone();
        this.router.navigate(['/viewquestion', this.question.id]);
      } catch (error) {
        if (error === 'cancel') {
          // that is ok
        } else {
          this.notificationService.emitError(error);
        }
      }
    }
  }

  private async showVersions(): Promise<void> {
    await this.versions.showDialog(this.question.id);
  }

  private async handleRouteChanged(id: number): Promise<void> {
    try {
      this.notificationService.emitLoading();
      this.question = await this.cranDataService.getQuestion(id);
      await this.comments.showComments(this.question.id);
      this.notificationService.emitDone();
    } catch (error) {
      this.notificationService.emitError(error);
    }
  }

}
