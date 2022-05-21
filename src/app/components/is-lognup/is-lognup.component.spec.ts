import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsLognupComponent } from './is-lognup.component';

describe('IsLognupComponent', () => {
  let component: IsLognupComponent;
  let fixture: ComponentFixture<IsLognupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsLognupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsLognupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
