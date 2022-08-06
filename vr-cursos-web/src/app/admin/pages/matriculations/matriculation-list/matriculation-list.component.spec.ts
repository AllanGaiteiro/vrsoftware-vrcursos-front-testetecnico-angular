import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculationListComponent } from './matriculation-list.component';

describe('MatriculationListComponent', () => {
  let component: MatriculationListComponent;
  let fixture: ComponentFixture<MatriculationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatriculationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatriculationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
