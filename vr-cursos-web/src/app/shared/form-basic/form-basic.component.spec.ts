import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCoursesComponent } from './form-basic.component';

describe('FormCoursesComponent', () => {
  let component: FormCoursesComponent;
  let fixture: ComponentFixture<FormCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
