import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvpageComponent } from './tvpage.component';

describe('TvpageComponent', () => {
  let component: TvpageComponent;
  let fixture: ComponentFixture<TvpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
