import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailInfoComponent } from './mail-info.component';

describe('MailInfoComponent', () => {
  let component: MailInfoComponent;
  let fixture: ComponentFixture<MailInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
