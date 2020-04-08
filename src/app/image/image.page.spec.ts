import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImagePage } from './image.page';

describe('ImagePage', () => {
  let component: ImagePage;
  let fixture: ComponentFixture<ImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
