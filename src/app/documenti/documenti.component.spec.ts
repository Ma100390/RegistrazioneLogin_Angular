import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentiComponent } from './documenti.component';

describe('DocumentiComponent', () => {
  let component: DocumentiComponent;
  let fixture: ComponentFixture<DocumentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
