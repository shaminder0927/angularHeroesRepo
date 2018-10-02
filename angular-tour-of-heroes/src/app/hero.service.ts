import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { Heroes } from './mock-heroes';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }
      
  //getHeroes(): Hero[] { return Heroes };

  /** GET heroes using rxjs from mock-heroes*/
  //getHeroes(): Observable<Hero[]> {
  //  this.messageService.add('HeroService: fetched Heroes');
  //  return of(Heroes);
  //};

  /** GET hero using rxjs from mock-heroes*/
  //getHero(id: number): Observable<Hero> {
  //  // TODO: send the message _after_ fetching the hero
  //  this.messageService.add('HeroService: fetched hero id=' + `${id}`);
  //  return of(Heroes.find(hero => hero.id === id));
  //}

  ///** GET heroes from the server */
  //getHeroes(): Observable<Hero[]> {
  //  return this.http.get<Hero[]>(this.heroesUrl);
  //}

  ///** GET hero from the server */
  //getHero(id: number): Observable<Hero> {
  //  // TODO: send the message _after_ fetching the hero
  //  return this.http.get<Hero>(this.heroesUrl + '/' + id);
  //}

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {     
    var arrayHero = this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      //map(aa => console.log(aa)),
      catchError(this.handleError('getHeroes', []))
    );
    return arrayHero;
  } 

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  getGridHeroes(): Observable<Hero[]> {
    var arrayHero = this.http.get<Hero[]>(this.heroesUrl);
    return arrayHero;
  } 


  ///** update Hero Details by angular-in-Memory-webapi call*/
  //updateHero(hero: Hero): Observable<any> {
  //  return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
  //    tap(_ => this.log(`updated hero id=${hero.id}`)),
  //    catchError(this.handleError<any>('updateHero'))
  //  );
  //}

  /** update Hero Details by SQL call*/
  updateHero(hero: Hero): Observable<any> {
    return this.http.post(this.postHeroUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    //const url = this.heroesUrl; // for angular-in-Memory-webapi call
    const url = this.postHeroUrl; // for SQL server api call
    
    return this.http.post<Hero>(url, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** Delete a hero */
  deleteHero(hero: Hero | number): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero w/ id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );    
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
       //if not search term, return empty hero array.
      return of([]);
    }
    //const url = `${this.heroesUrl}/?name=${term}`;  // for angular-in-Memory-webapi call
    const url = this.heroesUrl + '/SearchHeroes?term=' + `${term}`; // for SQL server api call  

    return this.http.get<Hero[]>(url).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService:` + `${message}`);
  }

   private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);// log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // URL to web api
//private heroesUrl = 'api/heroes';

 // get XML details from Herocontroller from .Net WebAPI using mock database
 //private heroesUrl = 'http://localhost:65168/api/hero';

 // get XML details from HeroDalController from .Net WebAPI using SQL server
  private heroesUrl = "http://localhost:65168/api/herodal";

  //Url for Add/Update request
  private postHeroUrl = this.heroesUrl + '/PostHero';
}
