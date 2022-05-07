import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentsBoxComponent } from './coments-box.component';

describe('ComentsBoxComponent', () => {
  let component: ComentsBoxComponent;
  let fixture: ComponentFixture<ComentsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentsBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
