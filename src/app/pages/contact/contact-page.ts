import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-contact',
  templateUrl: './contact-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPage implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact Page');
    this.meta.updateTag({ name: 'description', content: 'Ésta es mi contact page' });
    this.meta.updateTag({ name: 'og:title', content: 'Contact Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola, Mundo, Angular, SSR' });
  }
}
