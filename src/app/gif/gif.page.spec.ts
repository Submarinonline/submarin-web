import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GifPage } from './gif.page';

describe('GifPage', () => {
  let component: GifPage;
  let fixture: ComponentFixture<GifPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GifPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GifPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
