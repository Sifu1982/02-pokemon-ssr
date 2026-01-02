import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-contact',
  templateUrl: './contact-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPage {}
