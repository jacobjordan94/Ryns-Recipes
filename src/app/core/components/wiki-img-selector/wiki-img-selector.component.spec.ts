import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiImgSelectorComponent } from './wiki-img-selector.component';

describe('WikiImgSelectorComponent', () => {
  let component: WikiImgSelectorComponent;
  let fixture: ComponentFixture<WikiImgSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WikiImgSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WikiImgSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
