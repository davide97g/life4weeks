import { Color } from '@models/color';
import {
	Directive,
	ElementRef,
	HostListener,
	Input,
	AfterViewInit,
	OnChanges,
} from '@angular/core';

@Directive({
	selector: '[background]',
})
export class BackgroundColorDirective implements AfterViewInit, OnChanges {
	constructor(private el: ElementRef) {}
	ngAfterViewInit() {
		this.highlight(this.color);
	}
	ngOnChanges() {
		this.highlight(this.color);
	}

	@Input('background') color: string;
	@Input('opacity') opacity: number;
	@Input('fullColor') fullColor: Color;

	// @HostListener('mouseenter') onMouseEnter() {
	// 	this.highlight(this.color || 'red');
	// }

	// @HostListener('mouseleave') onMouseLeave() {
	// 	this.highlight(null);
	// }

	private highlight(color: string) {
		this.el.nativeElement.style.backgroundColor = color;
		if (this.fullColor)
			this.el.nativeElement.style.backgroundColor =
				'rgba(' +
				this.fullColor.rgba.R +
				',' +
				this.fullColor.rgba.G +
				',' +
				this.fullColor.rgba.B +
				',' +
				this.opacity +
				')';
	}
}
