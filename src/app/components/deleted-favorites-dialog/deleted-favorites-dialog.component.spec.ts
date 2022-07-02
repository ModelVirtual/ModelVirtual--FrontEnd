import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedFavoritesDialogComponent } from './deleted-favorites-dialog.component';

describe('DeletedFavoritesDialogComponent', () => {
  let component: DeletedFavoritesDialogComponent;
  let fixture: ComponentFixture<DeletedFavoritesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedFavoritesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedFavoritesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
