import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildIdComponent } from './child-id.component';

describe('ChildIdComponent', () => {
  let component: ChildIdComponent;
  let fixture: ComponentFixture<ChildIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
