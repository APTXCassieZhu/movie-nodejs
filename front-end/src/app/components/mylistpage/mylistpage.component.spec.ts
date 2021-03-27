import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MylistpageComponent } from './mylistpage.component';

describe('MylistpageComponent', () => {
  let component: MylistpageComponent;
  let fixture: ComponentFixture<MylistpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MylistpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MylistpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
