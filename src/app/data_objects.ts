// Data Manager Class. Creates objects for the films,
// characters, starships and vehicles with their information.

export class Data_manager {
  public films: Array<Film> = [];
  public vehicles: Array<Vehicle> = [];
  public starships: Array<Starship> = [];
  static instance: any;

  constructor() {
    // singleton constructor
    if (typeof Data_manager.instance === 'object'){
      return Data_manager.instance;
    }
    Data_manager.instance = this;
    console.log('Data manager created');
  }

  setFilms(response) {
    //check if 'films' array is already set up
    if (this.films.length > 0) {
      console.log('Films already set up!');
      return;
    }
    for (let i = 0; i < response.results.length; i++) {
      var f = new Film;
      f.title = response.results[i].title;
      f.director = response.results[i].director;
      f.release_date = response.results[i].release_date;
      //Set the characters
      f.setChar(response.results[i].characters);
      this.films.push(f);
    }
  }

  setVehicles(response) {
    for (let i = 0; i < response.results.length; i++) {
      var v = new Vehicle;
      v.name = response.results[i].name;
      v.model = response.results[i].model;
      v.manufacturer = response.results[i].manufacturer;
      this.vehicles.push(v);
    }
  }

  setStarships(response) {
    for (let i = 0; i < response.results.length; i++) {
      var s = new Starship;
      s.name = response.results[i].name;
      s.model = response.results[i].model;
      s.manufacturer = response.results[i].manufacturer;
      this.starships.push(s);
    }
  }
}

export class Character {
  public name;
  public url;
  public height;
  public mass;
  public hair_color;
  public skin_color;
  public eye_color;
  public birth_year;
  public gender;
}


export class Starship {
  public name;
  public model;
  public manufacturer;
}


export class Vehicle {
  public name;
  public model;
  public manufacturer;
}


export class Film {
  public title;
  public director;
  public release_date;
  public characters: Array<Character> = [];

  setChar(characters){
    if (this.characters.length > 0) {
      console.log('Characters already set up!');
      return;
    }
    for (let j = 0; j < characters.length; j++){
      this.reqChar(characters[j]);
    }
  }

  reqChar(url) {
    var me = this;
    var response;
    var URLhost = url;
    var req = new XMLHttpRequest();
    req.open('GET', URLhost, true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        response = JSON.parse(req.responseText);
        console.log(response);
        var c = new Character;
        c.name = response.name;
        c.url = URLhost;
        c.birth_year = response.birth_year;
        c.eye_color = response.eye_color;
        c.gender = response.gender;
        c.hair_color = response.hair_color;
        c.height = response.height;
        c.mass = response.mass;
        c.skin_color = response.skin_color;
        me.characters.push(c);
      } else {
        console.log('Error in network request: ' + req.statusText);
      }});
      req.send();
    }
  }
