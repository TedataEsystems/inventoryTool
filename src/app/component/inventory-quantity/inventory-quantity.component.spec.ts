import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryQuantityComponent } from './inventory-quantity.component';

describe('InventoryQuantityComponent', () => {
  let component: InventoryQuantityComponent;
  let fixture: ComponentFixture<InventoryQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
