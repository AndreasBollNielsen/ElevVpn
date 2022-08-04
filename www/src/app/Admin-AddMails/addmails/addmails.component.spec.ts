import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmailsComponent } from './addmails.component';

describe('AddmailsComponent', () => {
  let component: AddmailsComponent;
  let fixture: ComponentFixture<AddmailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
