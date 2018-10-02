import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
//import { Heroes } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  //hero: Hero = {
  //  id: 1,
  //  name: 'Windstorm',
  //  power: 'wind storm power'
  //};
  //heroes = Heroes;
  //selectedHero: Hero;

  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  //On Hero Selection
  //onSelect(hero: Hero): void {
  //  this.selectedHero = hero;
  //}

  // Get All Heroes using Service
  getHeroes(): void {
    //this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  //Add new hero
  add(name: string, power: string): void {
    var id = 0;
    name = name.trim();
    power = power.trim();

    if (!name || !power) { return; }
    this.heroService.addHero({ id, name, power } as Hero)
      .subscribe(() => this.getHeroes());
    }

  //Delete hero
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
 }
