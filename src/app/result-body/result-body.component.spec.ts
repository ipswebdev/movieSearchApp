import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultBodyComponent } from './result-body.component';

describe('ResultBodyComponent', () => {
  let component: ResultBodyComponent;
  let fixture: ComponentFixture<ResultBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
