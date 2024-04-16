import { Directive, Input, HostBinding, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { Observable, Subject, debounceTime, skip, startWith, takeUntil } from 'rxjs';

@Directive({
  selector: 'img[src]',
  standalone: true,
})
export class DefaultImgDirective implements OnDestroy {

  @HostBinding('src') 
  @Input() src!: string;
  
  @Input() default!: string;
  
  @HostBinding('class.image-loaded') hasLoaded = false;

  private _onDestroy$ = new Subject<void>();

  constructor(private _el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  public updateUrl() {
    this._getResizeObservable()
      .pipe(
        takeUntil(this._onDestroy$),
        debounceTime(350),

      ).subscribe(() => this._setDefault());
  }

  @HostListener('load')
  public load() {
    this.hasLoaded = true;
  }

  private _setDefault() {
    const { clientWidth, clientHeight } = this._el.nativeElement;
    const defaultImg = this.default ? this.default : `https://placehold.co/${clientWidth}x${clientHeight}?text=This+image+could+not+be+loaded`;
    if(this.src === defaultImg) return;
    this.src = defaultImg;
  }

  private _getResizeObservable(): Observable<void> {
    return new Observable(subsciber => {
      const ro = new ResizeObserver(() => subsciber.next());
      ro.observe(this._el.nativeElement);
      return () => {
        ro.unobserve(this._el.nativeElement);
        ro.disconnect();
      };
    });
  }

  public ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
    this._onDestroy$.unsubscribe();
  }

}
