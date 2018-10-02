import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  gridSource: LocalDataSource = new LocalDataSource();

  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false
      },
      name: {
        title: 'Name',
        type: 'string',
        filter: false
      },
      power: {
        title: 'Power',
        type: 'string',
        filter: false
      }
    }
  };

  onSearch(query: string = '') {
    this.gridSource.setFilter([
      // fields we want to include in the search
      {
        field: 'id',
        search: query
      },
      {
        field: 'name',
        search: query
      },
      {
        field: 'power',
        search: query
      }
    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search 
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

  //data1 = [
  //  {
  //    id: 1,
  //    name: "Leanne Graham",
  //    power: "Bret"
  //  },
  //  {
  //    id: 2,
  //    name: "Ervin Howell",
  //    power: "Antonette"
  //  }
  //];

  constructor(private heroService: HeroService) {

    this.heroService.getHeroes().subscribe(heroes => this.gridSource.load(heroes));
    //this.heroService.getHeroes().subscribe(heroes => this.gridSource.load(heroes));    
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}
