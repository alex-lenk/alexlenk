import {Component} from "@angular/core";

@Component( {
  selector: 'app-test',
  template: `
    <div class="test" id="our-work" style="height: 1000px">test inline component</div>
  `,
  styles: [`
    .test {
      border: 1px solid red;
      margin: 16px;
      padding: 16px;
      text-align: center;
    }
  `]
})

export class testComponent {}

