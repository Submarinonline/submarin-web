import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OptionComponent } from './option.component';

describe('OptionComponent', () => {
  let component: OptionComponent;
  let fixture: ComponentFixture<OptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
