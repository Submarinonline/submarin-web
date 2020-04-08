import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MutePage } from './mute.page';

describe('MutePage', () => {
  let component: MutePage;
  let fixture: ComponentFixture<MutePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MutePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
