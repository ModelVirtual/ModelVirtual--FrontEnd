import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedFavoritesDialogComponent } from './deleted-favorites-dialog.component';

describe('AddedFavoritesDialogComponent', () => {
  let component: AddedFavoritesDialogComponent;
  let fixture: ComponentFixture<AddedFavoritesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedFavoritesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedFavoritesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
