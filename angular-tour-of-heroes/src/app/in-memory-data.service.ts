import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    const heroes = [
      { id: 11, name: 'superman', power: 'strongest' },
      { id: 12, name: 'batman', power: 'intelligent and strong' },
      { id: 13, name: 'spiderman', power: 'can fly and has agility' },
      { id: 14, name: 'blade', power: 'hack slash' },
      { id: 15, name: 'flash', power: 'has speed' },
      { id: 16, name: 'thor', power: 'has thunder power' },
      { id: 17, name: 'rock', power: 'can smash' },
      { id: 18, name: 'hulk', power: 'is super strong' }
    ];
    return {heroes};
  }
}
