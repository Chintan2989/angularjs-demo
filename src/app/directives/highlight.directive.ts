import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
  @Input() appHighlight: number | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.appHighlight !== undefined && this.appHighlight > 1000) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'yellow');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
    }
  }
}
