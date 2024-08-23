import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAuthorsComponent } from './upload-authors.component';

describe('UploadAuthorsComponent', () => {
  let component: UploadAuthorsComponent;
  let fixture: ComponentFixture<UploadAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadAuthorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
