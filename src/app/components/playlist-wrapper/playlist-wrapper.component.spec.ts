import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistWrapperComponent } from './playlist-wrapper.component';

describe('PlaylistWrapperComponent', () => {
  let component: PlaylistWrapperComponent;
  let fixture: ComponentFixture<PlaylistWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
