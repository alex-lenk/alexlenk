import {Component, EventEmitter, OnInit, Output, ViewChild, ElementRef} from '@angular/core';
import {Post} from "../app.component";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})

export class PostFormComponent implements OnInit {
  title = ''
  text = ''

  @Output() onAdd: EventEmitter<Post> = new EventEmitter<Post>()

  @ViewChild('titleInput', {static: false}) inputRef: ElementRef | undefined

  constructor() {
  }

  ngOnInit() {
  }

  addPost() {
    if (this.title.trim() && this.text.trim()) {
      const post: Post = {
        title: this.title,
        text: this.text
      }

      this.onAdd.emit(post)

      this.title = this.text = ''
    }
  }

  focusTitle() {
    this.inputRef?.nativeElement.focus()
    //console.log(this.inputRef)
  }
}
