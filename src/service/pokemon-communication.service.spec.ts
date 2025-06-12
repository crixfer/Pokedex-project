import { TestBed } from '@angular/core/testing';

import { PokemonCommunicationService } from './pokemon-communication.service';

describe('PokemonCommunicationService', () => {
  let service: PokemonCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
