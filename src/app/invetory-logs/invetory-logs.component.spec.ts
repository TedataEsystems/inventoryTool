import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvetoryLogsComponent } from './invetory-logs.component';

describe('InvetoryLogsComponent', () => {
  let component: InvetoryLogsComponent;
  let fixture: ComponentFixture<InvetoryLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvetoryLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvetoryLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
