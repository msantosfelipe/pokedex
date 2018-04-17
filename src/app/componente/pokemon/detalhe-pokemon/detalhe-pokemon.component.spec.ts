import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhePokemonComponent } from './detalhe-pokemon.component';

describe('DetalhePokemonComponent', () => {
  let component: DetalhePokemonComponent;
  let fixture: ComponentFixture<DetalhePokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhePokemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
