import {Component} from '@angular/core';

export interface Post {
  title: string
  text: string
  id?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  posts: Post[] = [
    {title: 'Создание сайта на ангуляре', text: 'Очень длинный текст под заголовком для теста', id: 1},
    {title: 'Вывод постов на сайте ангуляр', text: 'для теста на сайте ангуляр - Очень длинный текст ', id: 2}
  ]

  updatePosts(post: Post) {
    this.posts.unshift(post)
    console.log('Post', post);
  }
}
