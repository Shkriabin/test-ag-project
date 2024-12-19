import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({selector: '[appHighlight]'})
export class HighlightDirective implements OnChanges {
  @Input() searchTerm: string = '';
  @Input() content: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges(): void {
    let highlightedContent = this.content;

    if (highlightedContent.length > 0) {
      const regex = new RegExp(`(${this.searchTerm})`, 'gi');
      highlightedContent = this.content.replace(
        regex,
        '<span style="background: lightgreen">$1</span>'
      );
    }

    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      highlightedContent
    );
  }

}
