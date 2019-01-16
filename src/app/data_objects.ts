
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


export class Film {
  public title;
  public director;
  public release_date;
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
