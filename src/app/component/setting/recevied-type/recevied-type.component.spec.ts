import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceviedTypeComponent } from './recevied-type.component';

describe('ReceviedTypeComponent', () => {
  let component: ReceviedTypeComponent;
  let fixture: ComponentFixture<ReceviedTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceviedTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceviedTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
