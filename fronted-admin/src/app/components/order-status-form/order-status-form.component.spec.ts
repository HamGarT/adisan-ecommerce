import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusFormComponent } from './order-status-form.component';

describe('OrderStatusFormComponent', () => {
  let component: OrderStatusFormComponent;
  let fixture: ComponentFixture<OrderStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderStatusFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
