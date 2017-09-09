import { Component, OnInit, Inject, Input, Output, EventEmitter, } from '@angular/core';

import {Tag} from '../model/tag';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  @Input() public tagList: Tag[] = [];
  @Input() public isEditable = false;

  @Output() onRemoveTagClick = new EventEmitter<Tag>();

  constructor() { }

  ngOnInit() {

  }

  private removeTag(tag: Tag) {
    this.onRemoveTagClick.emit(tag);
  }

}