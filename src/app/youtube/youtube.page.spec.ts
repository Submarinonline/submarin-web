import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YoutubePage } from './youtube.page';

describe('YoutubePage', () => {
  let component: YoutubePage;
  let fixture: ComponentFixture<YoutubePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YoutubePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
