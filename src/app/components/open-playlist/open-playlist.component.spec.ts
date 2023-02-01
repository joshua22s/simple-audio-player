import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPlaylistComponent } from './open-playlist.component';

describe('OpenPlaylistComponent', () => {
  let component: OpenPlaylistComponent;
  let fixture: ComponentFixture<OpenPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenPlaylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
