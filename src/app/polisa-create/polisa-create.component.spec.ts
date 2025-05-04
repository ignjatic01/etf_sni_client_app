import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolisaCreateComponent } from './polisa-create.component';

describe('PolisaCreateComponent', () => {
  let component: PolisaCreateComponent;
  let fixture: ComponentFixture<PolisaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolisaCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PolisaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
