import { Component, OnInit, Inject, ViewChild, } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router, } from '@angular/router';

import {ICranDataService} from '../icrandataservice';
import {CRAN_SERVICE_TOKEN} from '../cran-data.servicetoken';
import {Course} from '../model/course';
import {CourseInstance} from '../model/courseinstance';
import {StatusMessageComponent} from '../status-message/status-message.component';
import {NotificationService} from '../notification.service';
import {LanguageService} from '../language.service';
import {PagedResult} from '../model/pagedresult';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  public pagedResult: PagedResult<Course> = new PagedResult<Course>();

  constructor(@Inject(CRAN_SERVICE_TOKEN) private cranDataServiceService: ICranDataService,
    private router: Router,
    private notificationService: NotificationService,
    private ls: LanguageService) { }

  ngOnInit() {
    this.getCourses(0);
  }

  private async getCourses(page: number): Promise<void> {
    try {
      this.notificationService.emitLoading();
      const result = await this.cranDataServiceService.getCourses(page);
      this.pagedResult = result;
      this.notificationService.emitDone();
    } catch (error) {
      this.notificationService.emitError(error);
    }
  }

  public pageSelected(pageNumber: number) {
    this.getCourses(pageNumber);
  }

  public async startCourse(course: Course): Promise<void> {
    try {
      this.notificationService.emitLoading();
      const courseInstance = await this.cranDataServiceService.startCourse(course.id);
      if (courseInstance.numQuestionsAlreadyAsked < courseInstance.numQuestionsTotal) {
        this.router.navigate(['/askquestion', courseInstance.idCourseInstanceQuestion]);
      }
      this.notificationService.emitDone();
    } catch (error) {
      this.notificationService.emitError(error);
    }
  }

  public async editCourse(course: Course): Promise<void> {

    this.router.navigate(['/managecourse', course.id]);
  }

}
