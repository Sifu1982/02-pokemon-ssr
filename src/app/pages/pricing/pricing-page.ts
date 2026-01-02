import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-pricing',
  templateUrl: './pricing-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPage implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Pricing Page');
    this.meta.updateTag({ name: 'description', content: 'Ésta es mi pricing page' });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola, Mundo, Angular, SSR' });
  }
}
