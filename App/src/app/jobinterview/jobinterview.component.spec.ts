import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobinterviewComponent } from './jobinterview.component';

describe('JobinterviewComponent', () => {
  let component: JobinterviewComponent;
  let fixture: ComponentFixture<JobinterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobinterviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobinterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
