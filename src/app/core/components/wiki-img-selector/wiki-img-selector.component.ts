import { NgClass, NgFor } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-wiki-img-selector',
  standalone: true,
  imports: [ NgFor, NgClass ],
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
export class WikiImgSelectorComponent implements ControlValueAccessor, OnChanges {

  @Input() images: string[] | null = null;
  @Input() placeholder!: string;
  @Input('cols') cols = 'col-2'

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

  ngOnChanges(changes: any) {
    console.log(changes);
  }
  
}
