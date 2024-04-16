import { NgClass, NgFor } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultImgDirective } from '../../directives/default-img/default-img.directive';

@Component({
  selector: 'app-wiki-img-selector',
  standalone: true,
  imports: [ NgFor, NgClass, DefaultImgDirective ],
  templateUrl: './wiki-img-selector.component.html',
  styleUrl: './wiki-img-selector.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: WikiImgSelectorComponent
    }
  ],
})
export class WikiImgSelectorComponent implements ControlValueAccessor {

  @Input() images: string[] | null = null;
  @Input() placeholder!: string;
  @Input('cols') cols = 'col-2'

  hiddenImages: string[] = [];

  selectedImage!: string;

  onChange = (_selectedImage: string) => {};
  onTouched = () => {};

  touched: boolean = false;
  disabled: boolean = false;

  public onSelectImage(selectedImage: string) {
    this.selectedImage = selectedImage;
    this.markAsTouched();
    this.onChange(this.selectedImage);
  }

  writeValue(selectedImage: string): void {
    this.selectedImage = selectedImage;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if(!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
  
}
