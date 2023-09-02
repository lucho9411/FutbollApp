import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsCreateEditComponent } from './teams-create-edit.component';

describe('TeamsCreateEditComponent', () => {
  let component: TeamsCreateEditComponent;
  let fixture: ComponentFixture<TeamsCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
