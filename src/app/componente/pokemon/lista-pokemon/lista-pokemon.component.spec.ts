import { PokemonService } from './../../../servico/pokemon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CompartilhadoModule } from './../../../compartilhado/compartilhado.module';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPokemonComponent } from './lista-pokemon.component';
import { Router } from '@angular/router';

describe('ListaPokemonComponent', () => {
  let component: ListaPokemonComponent;
  let fixture: ComponentFixture<ListaPokemonComponent>;

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
      declarations: [ListaPokemonComponent],
      providers: [
        PokemonService,
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.esconderLoading();
    expect(component).toBeTruthy();
  });
});
