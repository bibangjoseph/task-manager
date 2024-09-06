import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTasksComponent } from './share-tasks.component';

describe('ShareTasksComponent', () => {
  let component: ShareTasksComponent;
  let fixture: ComponentFixture<ShareTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
