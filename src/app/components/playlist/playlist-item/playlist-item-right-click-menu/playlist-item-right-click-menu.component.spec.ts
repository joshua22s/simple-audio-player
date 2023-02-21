import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistItemRightClickMenuComponent } from './playlist-item-right-click-menu.component';

describe('PlaylistItemRightClickMenuComponent', () => {
  let component: PlaylistItemRightClickMenuComponent;
  let fixture: ComponentFixture<PlaylistItemRightClickMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistItemRightClickMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistItemRightClickMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
