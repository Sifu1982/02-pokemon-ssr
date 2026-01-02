import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-about',
  templateUrl: './about-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPage { }
