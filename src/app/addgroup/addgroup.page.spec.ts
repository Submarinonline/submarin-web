import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddgroupPage } from './addgroup.page';

describe('AddgroupPage', () => {
  let component: AddgroupPage;
  let fixture: ComponentFixture<AddgroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddgroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddgroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
