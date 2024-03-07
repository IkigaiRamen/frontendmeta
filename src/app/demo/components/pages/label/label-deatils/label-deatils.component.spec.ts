import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelDeatilsComponent } from './label-deatils.component';

describe('LabelDeatilsComponent', () => {
  let component: LabelDeatilsComponent;
  let fixture: ComponentFixture<LabelDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelDeatilsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabelDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
