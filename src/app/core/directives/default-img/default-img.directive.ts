import { Directive, Input, HostBinding, ElementRef, OnDestroy, HostListener, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, debounceTime, skip, startWith, takeUntil } from 'rxjs';

@Directive({
  selector: 'img[src]',
  standalone: true,
})
export class DefaultImgDirective implements OnDestroy {

  @HostBinding('src') 
  @Input() src!: string;
  
  @Input() default!: string;
  
  @Input() hideOnFail = false;
  @HostBinding('class.d-none') public hide: boolean = false;
  private _failed: boolean = false;
  
  @HostBinding('class.image-loaded') hasLoaded: boolean = false;

  private _onDestroy$ = new Subject<void>();

  @Output() public onError: EventEmitter<Event> = new EventEmitter();
  @Output() public onLoad: EventEmitter<string> = new EventEmitter();

  constructor(private _el: ElementRef<HTMLImageElement>) {}

  @HostListener('error', ['$event'])
  public updateUrl(event: Event) {
    this._failed = true;
    if(this.hideOnFail) {
      this.hide = true;
    }
    this._getResizeObservable()
      .pipe(
        takeUntil(this._onDestroy$),
        debounceTime(350),

      ).subscribe(() => this._setDefault());
    this.onError.emit(event);
  }

  @HostListener('load')
  public load() {
    this.hasLoaded = true;
    this.onLoad.emit(this.src);
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
