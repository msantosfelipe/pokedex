import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANIMATION_TYPES, LoadingModule } from 'ngx-loading';
import { CompartilhadoModule } from './../../../compartilhado/compartilhado.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { DetalhePokemonComponent } from './detalhe-pokemon.component';
import { PokemonService } from '../../../servico/pokemon.service';
import { Router, ActivatedRoute } from '@angular/router';

describe('DetalhePokemonComponent', () => {
  let component: DetalhePokemonComponent;
  let fixture: ComponentFixture<DetalhePokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CompartilhadoModule,
        LoadingModule.forRoot({
          animationType: ANIMATION_TYPES.circleSwish,
          backdropBackgroundColour: 'rgba(0,0,0,0.1)',
          backdropBorderRadius: '4px',
          primaryColour: '#0679f9',
        }),
        HttpClientTestingModule
      ],
      declarations: [DetalhePokemonComponent],
      providers: [
        PokemonService,
        {
          provide: ActivatedRoute, useValue: {
            params: Observable.of({ id: '1' })
          }
        },
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        },
      ]
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
