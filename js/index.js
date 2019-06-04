/* eslint-disable */


/*
Design Pattern Categorization
  Design patterns can be categorized in multiple ways, but the most popular one is the following:

    Creational design patterns
    Structural design patterns
    Behavioral design patterns
    Concurrency design patterns
    Architectural design patterns

Creational Design Patterns
  These patterns deal with object creation mechanisms which optimize object creation compared to a basic approach. The basic form of object creation could result in design problems or in added complexity to the design. Creational design patterns solve this problem by somehow controlling object creation. Some of the popular design patterns in this category are:

  Factory method
  Abstract factory
  Builder
  Prototype
  Singleton

Structural Design Patterns
  These patterns deal with object relationships. They ensure that if one part of a system changes, the entire system doesn’t need to change along with it. The most popular patterns in this category are:

  Adapter
  Bridge
  Composite
  Decorator
  Facade
  Flyweight
  Proxy

Behavioral Design Patterns
  These types of patterns recognize, implement, and improve communication between disparate objects in a system. They help ensure that disparate parts of a system have synchronized information. Popular examples of these patterns are:

  Chain of responsibility
  Command
  Iterator
  Mediator
  Memento
  Observer
  State
  Strategy
  Visitor

Concurrency Design Patterns
  These types of design patterns deal with multi-threaded programming paradigms. Some of the popular ones are:

  Active object
  Nuclear reaction
  Scheduler

Architectural Design Patterns
  Design patterns which are used for architectural purposes. Some of the most famous ones are:

  MVC (Model-View-Controller)
  MVP (Model-View-Presenter)
  MVVM (Model-View-ViewModel)
*/



// FIRST CLASS FUNCTION BEHAVIOR
// YOU CAN SET FUNCTIONS TO A VARIABLE, PASS THEM AROUND AS ARGUMENTS, DYNAMICALLY CALL THEM
const calc = () => {
  return Math.random();
};

calc();
let aNumber = calc();
console.log('logged: ' + aNumber);

// write a function that runs a callback

const callBack = (callMe) => {
  console.log('called back: ' + callMe());
  
}

callBack(calc);

for (let index = 0; index < 10; index++) {
  console.log(calc());
  
}





// PATTERNS ________________________________________________
// PATTERNS ________________________________________________
// PATTERNS ________________________________________________




// | - | - | - | - | - | - | - | - | - | - | - | - | - | - |
// ---------------- | CREATIONAL PATTERNS | ----------------
// | - | - | - | - | - | - | - | - | - | - | - | - | - | - |




// ======================================================
// ======================================================
// CLASS / OBJECT PATTERNS

class Vehicle {
  constructor(doors, engine, color) {
    this.door = doors;
    this.engine = engine;
    this.color = color;
  }
}

const civic = new Vehicle(4, 'V6', 'grey');
console.log(civic.color);




// ------------------------------------------------------
// ANOTHER EXAMPLE

// CREATING OBJECTS IN JAVASCRIPT
// this syntax allows you to create
// an object using a function and
// using the 'new' operator keyword
// this is know as a Function Constructor
// you can 'construct' an object by using a function
// the "new" keyword set the 'this' value to the
// new empty object you have just created

// as an unwritten best practice we start
// our Constructors with a capical letter
// to distinguish them from regular functions

function Tortas(type) {
  console.log(this);
  this.shell = 'bread';
  this.size = 'large';
  this.type = type || 'chicken';
  console.log('this function has been invoked');
}

const beefTorta = new Tortas('beef');
console.log('what kind of torta?');
console.log(beefTorta);
console.log(beefTorta.size);


// Function Constructors & the PROTOTYPE

// add a Method
Tortas.prototype.addCheese = function() {
  console.log('adding cheese...');
};

beefTorta.addCheese();

// ES6 syntax with Arrow Functions
Tortas.prototype.addSalsa = () => {
  return `adding salsa`;
};
console.log(beefTorta.addSalsa());




// ------------------------------------------------------
// ANOTHER EXAMPLE

// ANOTHER WAY TO CREATE AN OBJECT


// we are creating an Object here
// that will act as a Function Constructor
// when used in conjunction with Object.create()
// it will serve as the Prototype for all
// Objects it is used to create
const cerveza = {
  name: 'Default',
  size: '12 ounces',
  greet: function() {
    return `Hi, my name is ${this.name}`;
  }
};

// this will create a method available to all
// instances of this Object
cerveza.burp = function() {
  return `i ${this.name} have burpppeeedddd..`;
}

// now create a new Object using Object.create()
const dosxx = Object.create(cerveza);
console.log(dosxx);

// change the name prop
console.log(dosxx.greet());
dosxx.name = 'Dos XX';
console.log(dosxx.greet());

// this will create a method only available 
// on the DOSXX prototype
dosxx.drink = function() {
  return 'i have taken a drink...';
}

console.log(dosxx.drink());
console.log(dosxx.burp());

const budz = Object.create(cerveza);
budz.name = 'Budweiser';
console.log(budz.name);
// this below will not work
// console.log(budz.drink());





// ======================================================
// ======================================================
// SINGLETON
// PURPOSE: allows for the only one instance of an object to get created
/*
  The Singleton pattern is thus known because it restricts instantiation 
  of a class to a single object. Classically, the Singleton pattern can 
  be implemented by creating a class with a method that creates a new 
  instance of the class if one doesn’t exist. In the event of an instance 
  already existing, it simply returns a reference to that object. Singletons 
  differ from static classes (or objects) as we can delay their initialization, 
  generally because they require some information that may not be available 
  during initialization time. For code that is unaware of a previous reference 
  to them, they do not provide a method for easy retrieval. This is because it 
  is neither the object nor “class” that’s returned by a Singleton; it’s a 
  structure. Think of how closured variables aren’t actually closures—the function 
  scope that provides the closure is the closure. In JavaScript, Singletons serve 
  as a shared resource namespace which isolate implementation code from the global 
  namespace so as to provide a single point of access for functions. 
  We can implement a Singleton as follows:
*/
let boatInstance = false;

class Boat {
  constructor(color, size, kitchen) {
    if (!boatInstance) {
      this.color = color;
      this.size = size;
      this.kitchen = kitchen;
      boatInstance = this;
    } 
    else {
      return boatInstance;
    }    
  }
};

// create an instance
const yacht = new Boat('white', 'large', 'yes');
console.log(yacht);

const rower = new Boat('green', 'small', 'no');
console.log(rower);


// ------------------------------------------------------
// ANOTHER EXAMPLE

var singleton = (function() {
  // private singleton value which gets initialized only once
  var config;

  function initializeConfiguration(values){
      this.randomNumber = Math.random();
      values = values || {};
      this.number = values.number || 5;
      this.size = values.size || 10;
  }

  // we export the centralized method for retrieving the singleton value
  return {
      getConfig: function(values) {
          // we initialize the singleton value only once
          if (config === undefined) {
              config = new initializeConfiguration(values);
          }

          // and return the same config value wherever it is asked for
          return config;
      }
  };
})();

var configObject = singleton.getConfig({ "size": 8 });
// prints number: 5, size: 8, randomNumber: someRandomDecimalValue
console.log(configObject);
var configObject1 = singleton.getConfig({ "number": 8 });
// prints number: 5, size: 8, randomNumber: same randomDecimalValue as in first config
console.log(configObject1);



// ------------------------------------------------------
// ANOTHER EXAMPLE


const mySingleton = (function() {
  // Instance stores a reference to the Singleton  
  let instance;  
  
  function init() {
    // Singleton    
    // Private methods and variables    
    function privateMethod() {        
      console.log( "I am private" );    
    }    
    let privateVariable = "Im also private";    
    let privateRandomNumber = Math.random();    
  
    return {
      // Public methods and variables      
      publicMethod: function() {
        console.log('The public can see me!');
      },      
      publicProperty: "I am also public",      
      getRandomNumber: function() {
        return privateRandomNumber;
      }
    };  
  };

  return {
    // Get the Singleton instance if one exists    
    // or create one if it doesn't    
    getInstance: function() {
      if ( !instance ) {
        instance = init();
      }
      return instance;
    }  
  };
})();

// USAGE
const singleA = mySingleton.getInstance();
const singleB = mySingleton.getInstance();
console.log('SINGLETON SINGLETON');

console.log( singleA.getRandomNumber() === singleB.getRandomNumber() ); // true




// ======================================================
// ======================================================
// FACTORY
// PURPOSE: quickly creates predetermined instance types; use one class to create many instances of another class
/*
  The Factory pattern is another creational pattern concerned with the notion 
  of creating objects. Where it differs from the other patterns in its category 
  is that it doesn’t explicitly require the use of a constructor. Instead, a 
  Factory can provide a generic interface for creating objects, where we can 
  specify the type of factory object we wish to be created.
*/
// using our Vehicle class above
class CarFactory {
  // factory method
  createCar(type) {
    switch(type) {
      case 'civic':
        return new Vehicle(4, 'V6', 'red');
      case 'honda':
        return new Vehicle(2, 'V4', 'blue');
    }
  }
};

// now we initialize our factory class for usage
const carFactory = new CarFactory();
const honda = carFactory.createCar('honda');
console.log(honda);




// ======================================================
// ======================================================
// ABSTRACT (factory)
// PURPOSE: create predetermined instance types of two or more classes; use one class to create instances of two or more classes
/*
  It is also useful to be aware of the Abstract Factory pattern, which aims to 
  encapsulate a group of individual factories with a common goal. It separates 
  the details of implementation of a set of objects from their general usage. 
  An Abstract Factory pattern should be used where a system must be independent 
  from the way the objects it creates are generated or it needs to work 
  with multiple types of objects.
*/

// using our Vehicle class ABOVE
class SuvFactory {
  // factory method
  createSuv(type) {
    switch(type) {
      case 'suburban':
        return new Vehicle(4, 'V8', 'black');
      case 'escalade':
        return new Vehicle(4, 'V8', 'cream');
    }
  }
};

const suvFactory = new SuvFactory();


// here is our ABSTRACT factory pattern
// we use two other factory classes to add another layer of ABSTRACTION to our program
const vehicleAbstractor = (type, model) => {
  switch(type) {
    case 'car':
      return carFactory.createCar(model);
    case 'suv':
      return suvFactory.createSuv(model);
  }
}

const makeACadi = vehicleAbstractor('suv','escalade');
console.log(makeACadi);











// | - | - | - | - | - | - | - | - | - | - | - | - | - | - |
// --------------- | STRUCTURAL PATTERNS | -----------------
// | - | - | - | - | - | - | - | - | - | - | - | - | - | - |



// ======================================================
// ======================================================
// MODULE
// PURPOSE: chunk of code, usually a Function, or Object, or Class(syntax sugar) that maintains limited scope and closure

// THINK: Immediately Invoked Function Expression


// CONTAINER FORMATS
// old school style
(function(){
  console.log('iffe here...');
})();

// OR
(function() {
  console.log('iffe here...');
}());

// ES6 style
(() => {
  console.log('ES6 iffe here...');
})();

((thing) => {
  console.log('ES6 ' + thing);
})('is cool...');

// this is also an IIFE
const iffe = function(thing) {
  console.log('this ' + thing);
}('is cool...');


// ------------------------------------------------------
// BASIC MODULE PATTERN

// through the use of a closure we expose an object
// as a public API which manages the private objects array
const myModule = (function() {
  // private members
  let objects = [];

  // public members
  return {
    addObject: function(object) {
      objects.push(object);
    },
    removeObject: function(object) {
      let oIndex = objects.indexOf(object);
      if (oIndex >= 0) {
        objects.splice(oIndex, 1);
      }
    },
    getObjects: function() {
      return JSON.parse(JSON.stringify(objects));
    }
  };
})();

// USAGE
myModule.addObject('Jake');
myModule.addObject('Ana');
myModule.addObject('Marina');
myModule.addObject('Gabriela');

console.log(myModule.getObjects());
myModule.removeObject('Jake');
console.log(myModule.getObjects());



// ------------------------------------------------------
// SELF REVEALING MODULE PATTERN

// we write the entire object logic as private members and
// expose an anonymous object which maps members we wish to reveal
// to their corresponding public members
const myRevealingModule = (function() {
  // private members
  let objects = [];

  function addObject(object) {
      objects.push(object);
  }

  function removeObject(object) {
      var index = objects.indexOf(object);
      if (index >= 0) {
          objects.splice(index, 1);
      }
  }

  function getObjects() {
      return JSON.parse(JSON.stringify(objects));
  }

  // public members
  return {
      addName: addObject,
      removeName: removeObject,
      getNames: getObjects
  };
})();

myRevealingModule.addName("Juan");
myRevealingModule.addName("Maria");
myRevealingModule.addName("Elena");

console.log(myRevealingModule.getNames());
myRevealingModule.removeName("Juan");
console.log(myRevealingModule.getNames());




// ======================================================
// ======================================================
// MIXINS
// PURPOSE: add a method to the prototype of an object/class
// SUBCLASSING - Sub-classing is a term that refers to inheriting properties for a new object from a base or superclass object. 
// mixins is a form of Sub-classing

/* 
  In JavaScript, we can look at inheriting from Mixins as a means of 
  collecting functionality through extension. Each new object we    
  define has a prototype from which it can inherit further properties.    
  Prototypes can inherit from other object prototypes but, even more    
  importantly, can define properties for any number of object instances. 
  We can leverage this fact to promote function reuse.

  Mixins allow objects to borrow (or inherit) functionality from them with 
  a minimal amount of complexity. As the pattern works well with JavaScript’s 
  object prototypes, it gives us a fairly flexible way to share functionality 
  from not just one Mixin, but effectively many through multiple inheritance. 
  They can be viewed as objects with attributes and methods that can be easily 
  shared across a number of other object prototypes.
*/

let vehicleMixin = {
  // a new way to write methods in Objects
  // you dont need the colon and word function
  gas() {
    console.log(`This ${this.engine} sounds like vrooommm...`);
  },
  honk() {
    console.log('..honking the horn...');
    
  }

};

Object.assign(Vehicle.prototype, vehicleMixin);

makeACadi.gas();
makeACadi.honk();



// ------------------------------------------------------
// ANOTHER EXAMPLE


const trickMixins = {
  board: ' on this Guerrero board.',
  ollie: function() {
    console.log('OLLIE' + this.board);
    
  },
  kickflip: function() {
    console.log('KICKFLIP');
  }
};

function Skater() {
  this.skate = function() {
    console.log('BEGIN TO SKATE...');
  }
}

const jakeThrasher = new Skater();
console.log('SKATE OR DIE!');

jakeThrasher.skate();

//transfer special skate powers
Object.assign(Skater.prototype, trickMixins);
jakeThrasher.ollie();


// ======================================================
// ======================================================
// FACADE
// PURPOSE: think simple API exposure, providing developer a SINGLE method to invoke 
//          that performs many actions behind the scene
/*
This is a structural design pattern that is widely used in the JavaScript libraries. 
It is used to provide a unified and simpler public facing interface for ease of use 
that shields away from the complexities of its consisting subsystems or subclasses.

The use of this pattern is very common in libraries like jQuery.

This pattern provides a convenient higher-level interface to a larger body of code, 
hiding its true underlying complexity. Think of it as simplifying the API being 
presented to other developers, something that almost always improves usability
*/




let currentId = 0;

class ComplaintRegistry {
  registerComplaint(customer, type, details) {
    const id = ComplaintRegistry._uniqueIdGenerator();
    let registry;
    if (type === 'service') {
      registry = new ServiceComplaints();
    } else {
      registry = new ProductComplaints();
    }
    return registry.addComplaint({ id, customer, details });
  }

  static _uniqueIdGenerator() {
    return ++currentId;
  }
}

class Complaints {
  constructor() {
    this.complaints = [];
  }

  addComplaint(complaint) {
    this.complaints.push(complaint);
    return this.replyMessage(complaint);
  }

  getComplaint(id) {
    return this.complaints.find(complaint => complaint.id === id);
  }

  replyMessage(complaint) {}
}

class ProductComplaints extends Complaints {
  constructor() {
    super();
    // if (ProductComplaints.exists) {
    //   return ProductComplaints.instance;
    // }
    // ProductComplaints.instance = this;
    // ProductComplaints.exists = true;
    // return this;
  }

  replyMessage({ id, customer, details }) {
    return `Complaint No. ${id} reported by ${customer} regarding ${details} have been filed with the Products Complaint Department. Replacement/Repairment of the product as per terms and conditions will be carried out soon.`;
  }
}

class ServiceComplaints extends Complaints {
  constructor() {
    super();
    // if (ServiceComplaints.exists) {
    //   return ServiceComplaints.instance;
    // }
    // ServiceComplaints.instance = this;
    // ServiceComplaints.exists = true;
    // return this;
  }

  replyMessage({ id, customer, details }) {
    return `Complaint No. ${id} reported by ${customer} regarding ${details} have been filed with the Service Complaint Department. The issue will be resolved or the purchase will be refunded as per terms and conditions.`;
  }
}

// usage
const registry = new ComplaintRegistry();

const reportService = registry.registerComplaint('Martha', 'service', 'availability');
// 'Complaint No. 1 reported by Martha regarding availability have been filed with the Service Complaint Department. The issue will be resolved or the purchase will be refunded as per terms and conditions.'

const reportProduct = registry.registerComplaint('Jane', 'product', 'faded color');
// 'Complaint No. 2 reported by Jane regarding faded color have been filed with the Products Complaint Department. Replacement/Repairment of the product as per terms and conditions will be carried out soon.'

console.log(reportService);
console.log(reportProduct);




// ======================================================
// ======================================================
// FLYWEIGHT
// PURPOSE: sharing data across objects, avoids duplication of data; 
//          supports objects with the same internal data by sharing a single object
/* 
  In the Flyweight pattern, there’s a concept of two states: intrinsic and extrinsic. 
  Intrinsic information may be required by internal methods in our objects, which they 
  absolutely cannot function without. Extrinsic information can however be removed and stored externally.

  Objects with the same intrinsic data can be replaced with a single shared object, 
  created by a factory method. This allows us to reduce the overall quantity of 
  implicit data being stored quite significantly.

  The Flyweight pattern is a classical structural solution for optimizing code 
  that is repetitive, slow, and inefficiently shares data.    
  It aims to minimize the use of memory in an application by sharing as much    
  data as possible with related objects (e.g., application configuration, state, and so.

  In practice, Flyweight data sharing can involve taking several similar objects or 
  data constructs used by a number of objects and placing this data into a single 
  external object. We can pass through this object through to those depending on this 
  data, rather than storing identical data across each one.
*/

// flyweight class
class Icecream {
  constructor(flavour, price) {
    this.flavour = flavour;
    this.price = price;
  }
}

// factory for flyweight objects
class IcecreamFactory {
  constructor() {
    this._icecreams = [];
  }

  createIcecream(flavour, price) {
    let icecream = this.getIcecream(flavour);

    if (icecream) {
      return icecream;
    } 
    else {
      const newIcecream = new Icecream(flavour, price);
      this._icecreams.push(newIcecream);
      // console.log(this._icecreams);
      
      return newIcecream;
    }
  }

  getIcecream(flavour) {
    return this._icecreams.find(icecream => icecream.flavour === flavour);
  }
}

// usage
const factory = new IcecreamFactory();

const chocoVanilla = factory.createIcecream('chocolate and vanilla', 15);
const vanillaChoco = factory.createIcecream('chocolate and vanilla', 15);
const vanillaChoco2 = factory.createIcecream('chocolate and strawberry', 10);

// reference to the same object
console.log(chocoVanilla === vanillaChoco); // true




// ======================================================
// ======================================================
// DECORATOR
// PURPOSE: 
/* 
  Decorators are a structural design pattern that aim to promote code reuse. 
  Similar to Mixins, they can be considered another viable alternative to 
  object subclassing.Classically, Decorators offered the ability to add behavior 
  to existing classes in a system dynamically. The idea was that the decoration 
  itself wasn’t essential to the base functionality of the class; otherwise, it 
  would be baked into the superclass itself.They can be used to modify existing 
  systems where we wish to add additional features to objects without the 
  need to heavily modify the underlying code using them. A common reason why 
  developers use them is that their applications may contain features requiring 
  a large quantity of distinct types of object. 

  This is also a structural design pattern that focuses on the ability to add 
  behaviour or functionalities to existing classes dynamically. It is another 
  viable alternative to sub-classing.

The decorator type behaviour is very easy to implement in JavaScript because 
JavaScript allows us to add methods and properties to object dynamically. The 
simplest approach would be to just add a property to an object but it will not be efficiently reusable.
*/


/* 
old school simple example
1st build a Function constructor 
then we then add methods to new Objects created with this constructor
or add methods to constructor prototype
*/

function Taco(type) {
  this.filling = type || 'chicken';
  this.quantity = 1;
}

Taco.prototype.addSalsa = function(flavor) {
  console.log(`...adding ${flavor} salsa to ${this.filling} taco...`);
};

const fajita = new Taco('fajita');

// create new methods and add them to this object prototype
fajita.updateQuantity = function(count) {
  this.quantity = count;
  console.log(`updated count to: ${count}`);
};

fajita.addGuac = function() {
  console.log('..adding guacamole..');
};

fajita.updateQuantity(3);
fajita.addGuac();
console.log(fajita);
fajita.addSalsa('chile verde');

const beanCheese = new Taco('bean and cheese');

console.log(beanCheese);
beanCheese.addSalsa('ranchera');


// ------------------------------------------------------
// ANOTHER EXAMPLE
// here we use functions
// this is considered a Decorator because the
// Constructors properties and methods (values) are NOT overridden


function MacBook() {
  this.cost = function() {
    return 997;
  };
  this.screenSize = function() {
    return 11.6;
  };
}

// Decorator 1
function Memory( macbook ) { 
  var v = macbook.cost(); 
  macbook.cost = function() { 
    return v + 75; 
  }; 
} 

// Decorator 2
function Engraving( macbook ){
  var v = macbook.cost(); 
  macbook.cost = function(){
    return  v + 200;
  };
}
 
// Decorator 3
function Insurance( macbook ){
  var v = macbook.cost(); 
  macbook.cost = function(){
     return  v + 250;
  };
}

var mb = new MacBook(); 
Memory(mb); 
Engraving(mb);
Insurance(mb);

// Outputs: 1522
console.log( mb.cost() );

// Outputs: 11.6
console.log( mb.screenSize() );




// ------------------------------------------------------
// ANOTHER EXAMPLE
// here we use a Class/constructor
// 

class Book {
  constructor(title, author, price) {
    this._title = title;
    this._author = author;
    this.price = price;
  }

  getDetails() {
    return `${this._title} by ${this._author}`;
  }
}

// decorator 1
function giftWrap(book) {
  book.isGiftWrapped = true;
  book.unwrap = function() {
    return `Unwrapped ${book.getDetails()}`;
  };

  return book;
}

// decorator 2
function hardbindBook(book) {
  book.isHardbound = true;
  book.price += 5;
  return book;
}

// usage
const alchemist = new Book('The Alchemist', 'Paulo Coelho', 10);
console.log(giftWrap(alchemist));
console.log(alchemist.unwrap());

// YOU CAN ALSO JUST WRAP THE INSTANCE CREATION WITH THE DECORATOR FUNCTIONS
// const alchemist = giftWrap(new Book('The Alchemist', 'Paulo Coelho', 10));
// console.log(alchemist.isGiftWrapped); // true
// console.log(alchemist.unwrap()); // 'Unwrapped The Alchemist by Paulo Coelho'

// const inferno = hardbindBook(new Book('Inferno', 'Dan Brown', 15));
// console.log(inferno.isHardbound); // true
// console.log(inferno.price); // 20





// ------------------------------------------------------
// ANOTHER EXAMPLE










// ======================================================
// ======================================================
// MVC - MODEL-VIEW-CONTROLLER
// PURPOSE: 




// ======================================================
// ======================================================
// MVP - MODEL-VIEW-PRESENTER
// PURPOSE: 




// ======================================================
// ======================================================
// MVVM - MODEL-VIEW-VIEWMODEL
// PURPOSE: 











// | - | - | - | - | - | - | - | - | - | - | - | - | - | - |
// ---------------- | BEHAVIORAL PATTERNS | ----------------
// | - | - | - | - | - | - | - | - | - | - | - | - | - | - |





// ======================================================
// ======================================================
// OBSERVER
// PURPOSE: 
/* 
  The Observer is a design pattern in which an object (known as a subject) 
  maintains a list of objects depending on it (observers), automatically 
  notifying them of any changes to state.

  When a subject needs to notify observers about something interesting happening, 
  it broadcasts a notification to the observers (which can include specific data 
  related to the topic of the notification).

  When we no longer wish for a particular observer to be notified of changes by 
  the subject it is registered with, the subject can remove it from the list of observers.

  The observer pattern is one where we maintain a list of objects, based on events, and 
  is typically done with updating data based on events.

*/

// OBSERVER CONTAINER

function ObserverList() {
  this.observerList = [];
}

ObserverList.prototype.add = function(obj) {
  return this.observerList.push(obj);
};

ObserverList.prototype.empty = function() {
  this.observerList = [];
};

ObserverList.prototype.count = function() {
  return this.observerList.length;
};

ObserverList.prototype.get = function(index) {
  if (index > -1 && index < this.observerList.length) {
    return this.observerList[index]
  }
};

ObserverList.prototype.indexOf = function(obj, startIndex) {
  var i = startIndex;
 
  while(i < this.observerList.length) {
    if (this.observerList[i] === obj) {
      return i;
    }
    i++;
  }
 
  return -1;
};
 
ObserverList.prototype.removeAt = function(index) {
  this.observerList.splice(index, 1);
};



// SUBJECT
function Subject() {
  this.observers = new ObserverList();
}

Subject.prototype.addObserver = function(observer) {
  this.observers.add(observer);
};

Subject.prototype.removeObserver = function(observer) {
  this.observers.removeAt(this.observers.indexOf(observer, 0));
};

Subject.prototype.notify = function(context) {
  var observerCount = this.observers.count();

  // run the update() for all instances created (in this case all the checkboxes)
  for(var i = 0; i < observerCount; i++) {
    this.observers.get(i).update(context);
  }
};


// The OBSERVER
function Observer() {
  this.update = function() {

  };
}

// here we manually extend (give access to properties and methods)
// to a new object instanciation
function extend(obj, extension) {
  for(var key in extension) {
    obj[key] = extension[key];
  }
}


// USAGE
// References to our DOM elements
 
var controlCheckbox = document.getElementById('mainCheckbox'),
  addBtn = document.getElementById('addNewObserver'),
  container = document.getElementById('observersContainer');
 
 
// Concrete Subject
 
// Extend the controlling checkbox with the Subject class
extend(controlCheckbox, new Subject());
 
// Clicking the checkbox will trigger notifications to its observers
controlCheckbox.onclick = function() {
  controlCheckbox.notify(controlCheckbox.checked);
    // console.log('what is CONTROL checkbox value?');
    // console.log(controlCheckbox.checked);
};
 
addBtn.onclick = addNewObserver;
 
// Concrete Observer
// add a new checkbox onclick and assign/extend with an update() function 
function addNewObserver() {
 
  // Create a new checkbox to be added
  var check = document.createElement("input");
  check.type = "checkbox";
 
  // Extend the checkbox with the Observer class
  extend(check, new Observer());
 
  // Override with custom update behaviour
  check.update = function(value){
    this.checked = value;
  };
 
  // Add the new observer to our list of observers
  // for our main subject
  controlCheckbox.addObserver(check);
 
  // Append the item to the container
  container.appendChild(check);
}




// ------------------------------------------------------
// ANOTHER EXAMPLE
// USING CLASSES
// had to rename this to Subject1/Observer1 so it would not clash with code above

class Subject1 {
 constructor() {
   this._observers = [];
 } 

 subscribe(observer) {
  this._observers.push(observer);
 }
 unsubscribe(observer) {
  this._observers = this._observers.filter(obs => observer !== obs);
 }
 fire(change) {
  this._observers.forEach(observer => {
    observer.update(change);
  });
 }
};


class Observer1 {
  constructor(state) {
    this.state = state;
    this.initialState = state;
  }
  update(change){
    let state = this.state;
    switch(change) {
      case 'INC': 
        this.state = ++state;
        break;
      case 'DEC':
        this.state = --state;
        break;
      default:
        this.state = this.initialState;
    };
  }
};


// USAGE

const sub = new Subject1();
const obs1 = new Observer1(1);
const obs2 = new Observer1(19);

sub.subscribe(obs1);
sub.subscribe(obs2);

sub.fire('INC');
console.log(obs1.state); // 2
console.log(obs2.state); // 20

// ------------------------------------------------------
// ANOTHER EXAMPLE







// ------------------------------------------------------
// ANOTHER EXAMPLE

















// ======================================================
// ======================================================
// STATE
// PURPOSE: 

/*
  It is a behavioural design pattern that allows an object to alter its 
  behaviour based on changes to its internal state. The object returned 
  by a State pattern class seems to change its class. It provides 
  state-specific logic to a limited set of objects in which each object 
  type represents a particular state.

  The state pattern has become popular with React's usage, and now most 
  web development frameworks use it. Basically the state pattern is one 
  were we hold the state of the application with all the data and properties 
  needed, sometimes called props, in React. And when it changes, it updates 
  the rendering of the application. And again, needless to say, React, 
  Angular, and every state management library are a great example of its use.
*/

// implement a class called TrafficLight
// implement a class called:
/*
    Light
    RedLight, GreenLight, YellowLight that extends Light
*/


class TrafficLight {
  constructor() {
    this.states = [new GreenLight(), new RedLight(), new YellowLight()];
    this.currentState = this.states[0];
  }
  // this method changes the current state incrementally in sequential order 1,2,3-1,2,3
  change() {
    const totalStates = this.states.length;
    let currentIndex = this.states.findIndex(light => light === this.currentState);
    if (currentIndex + 1 < totalStates) {
      this.currentState = this.states[currentIndex + 1];
    }
    else {
      this.currentState = this.states[0];
    }
  }
  sign() {
    // run the sign method for the current state being worked with
    return this.currentState.sign();
  }
};

class Light {
  constructor(light) {
    this.light = light;
  }
};

class RedLight extends Light {
  constructor() {
    super('Red')
  }
  sign() {
    return 'STOP';
  }
};

class GreenLight extends Light {
  constructor() {
    super('GREEN');
  }
  sign() {
    return 'GO';
  }
};

class YellowLight extends Light {
  constructor() {
    super('YELLOW');
  }
  sign() {
    return 'STEADY';
  }
};

// USAGE
// create a new instance of TrafficLight
const trafficLight = new TrafficLight();
console.log(trafficLight.sign()); // 'GO'
trafficLight.change();

console.log(trafficLight.sign()); // 'STOP'
trafficLight.change();

console.log(trafficLight.sign()); // 'STEADY'
trafficLight.change();

console.log(trafficLight.sign()); // 'GO'
trafficLight.change();

console.log(trafficLight.sign()); // 'STOP'




// ======================================================
// ======================================================
// CHAIN OF RESPONSIBILITY
// PURPOSE: chaining functions(methods); passing/returning 'this'; 

/* 


  The chain of responsibility is a pattern to help solve common practical 
  issues of having a request from a client and needing this request to pass 
  through multiple functions or logic to get the result. This is where chain 
  of responsibility comes into play.
*/

class CumulativeSum {
  constructor(initialValue = 0) {
    this.sum = initialValue;
  }
  add(value) {
    this.sum += value;
    return this;
  }
};

const myTotal = new CumulativeSum();
console.log(myTotal.add(3).add(3).add(3));
console.log(myTotal);




// ------------------------------------------------------
// ANOTHER EXAMPLE


const SkateCart = {
  price: 50,
  calcTax: function() {
    this.price = this.price + (this.price * .06);
    return this;
  }
};

SkateCart.addGripTap = function() {
  this.price += 10;
  return this;
};

SkateCart.addTrucks = function() {
  this.price += 50;
  return this;
}

SkateCart.addWheels = function() {
  this.price += 50;
  return this;
};

let myBoard = Object.create(SkateCart);
console.log(myBoard.price);
myBoard.addGripTap().addTrucks().addWheels();
console.log(myBoard);
myBoard.calcTax();
console.log(myBoard);




// ======================================================
// ======================================================
// ITERATOR
// PURPOSE: the concept is how to iterate thru a dataset or an object, or Object properties
// ES6 provides us with syntax GENERATOR FUNCTIONS
// GENERATOR FUNCTIONS
// The 'yield' keyword is used to pause and resume a generator function*
// It can be thought of as a generator-based version of the 'return' keyword.
// The yield keyword actually returns an IteratorResult object with
// two properties, value and done.
// The value property is the result of evaluating the yield expression
// done is false indicating that the generator function has not fully completed.
// done becomes true when function has finished iterating thru data

// a sample array of objects to work with as data
const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879 },
  { first: 'Isaac', last: 'Newton', year: 1643 },
  { first: 'Galileo', last: 'Galilei', year: 1564 },
  { first: 'Marie', last: 'Curie', year: 1867 },
  { first: 'Johannes', last: 'Kepler', year: 1571 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473 },
  { first: 'Max', last: 'Planck', year: 1858 }
];

// function* generateYields(data) {
//   for(const inventor of data) {
//     yield inventor;
//   }
// }

// call the generator function and retrieve data with
// next() and next().value.prop calls
// const inventorData = generateYields(inventors);

// console.log(inventorData);
// console.log(inventorData.next());
// console.log(inventorData.next().value);
// console.log(inventorData.next().value.first);
// console.log(inventorData.next().value.last);
// console.log(inventorData.next().value.year);




// ======================================================
// ======================================================
// STRATEGY
// PURPOSE: 
/* 
  allows you to compose a super-class and several sub-classes so
  that you can pick at implementation time, how to instanciate them
  allows you to pick and choose instantiation based on your scenario needs

*/

class Commute {
  travel(transport) {
    return transport.travelTime();
  }
};

class Vehikle {
  travelTime() {
    return this._timeTaken;
  }
};

// stategy 1
class Bus extends Vehikle {
  constructor() {
    super();
    this._timeTaken = 15;
  }
  travelTime() {
    return 'you just got hacked...';
  }
}

// stategy 2
class Taxi extends Vehikle {
  constructor() {
    super();
    this._timeTaken = 10;
  }
}

// stategy 3
class PersonalCar extends Vehikle {
  constructor() {
    super();
    this._timeTaken = 5;
  }
}

// usage
const commute = new Commute();
console.log(commute.travel(new Taxi())); // 10
console.log(commute.travel(new Bus())); // 15


// ------------------------------------------------------
// ANOTHER EXAMPLE







// ======================================================
// ======================================================
// MEDIATOR
// PURPOSE: In implementation terms, the Mediator pattern is essentially a shared subject in the Observer pattern.

/* 
  The dictionary refers to a mediator as “a neutral party that assists in 
  negotiations and conflict resolution.”[2] In our world, a mediator is a 
  behavioral design pattern that allows us to expose a unified interface 
  through which the different parts of a system may communicate.

  If it appears a system has too many direct relationships between components, 
  it may be time to have a central point of control that components communicate 
  through instead. The Mediator pattern promotes loose coupling by ensuring that 
  instead of components referring to each other explicitly, their interaction is 
  handled through this central point. This can help us decouple systems and improve 
  the potential for component reusability.

  A real-world analogy could be a typical airport traffic control system. A tower (mediator) 
  handles which planes can take off and land, because all communications (notifications 
  being listened for or broadcast) are performed from the planes to the control tower, 
  rather than from plane to plane. A centralized controller is key to the success of 
  this system, and that’s really the role that the Mediator plays in software design

*/

class TrafficTower {
  constructor() {
    this._airplanes = [];

  }
  register(airplane) {
    this._airplanes.push(airplane);
    airplane.registerPlane(this);
  }
  communicateCoordinates(airplane) {
    return this._airplanes.filter(plane => airplane !== plane).map(plane => plane.coordinates);
  }

};

class Airplane {
  constructor(coordinates) {
    this.coordinates = coordinates;
    this.trafficTower = null;    
  }
  registerPlane(trafficTower) {
    this.trafficTower = trafficTower;
  }
  requestCoordinates() {
    if (this.trafficTower) {
      return this.trafficTower.communicateCoordinates(this);
    }
    return null;
  }
};

// usage

const tower = new TrafficTower();
const airplanes = [new Airplane(10), new Airplane(20), new Airplane(30)];
airplanes.forEach(airplane => {
  tower.register(airplane);
});
console.log(airplanes[0].requestCoordinates());
console.log(airplanes[1].requestCoordinates());
console.log(airplanes[2].requestCoordinates());
console.log(tower);








// ======================================================
// ======================================================
// COMMAND
// PURPOSE: 

/* 
  The Command pattern aims to encapsulate method invocation, requests, or 
  operations into a single object and gives us the ability to both 
  parameterize and pass method calls around that can be executed at our 
  discretion. In addition, it enables us to decouple objects invoking the 
  action from the objects that implement them, giving us a greater degree of 
  overall flexibility in swapping out concrete classes (objects).
*/


const carManager = {
  requestInfo: function(model, id) {
    return "The information for " + model + " with ID " + id + " is foobar";
  },
  buyVehicle: function(model, id) {
    return "You have successfully purchased Item " + id + ", a " + model;
  },
  arrangeViewing: function(model, id) {
    return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
  },
  changeColor: function(params) {
    return "You have changed the color of your " + params[0] + " to " + params[1];
  } 
};

carManager.execute = function(name) {
  // we reference the method by using computed property name syntax object[propName]
  return carManager[name] && carManager[name].apply( carManager, [].slice.call(arguments, 1) );
};

carManager.execute1 = function(name, ...rest) {
  // how do I check if a method is part of an object?
  return carManager[name](rest);
};


console.log(carManager.execute( "arrangeViewing", "Ferrari", "14523" ));
carManager.execute( "requestInfo", "Ford Mondeo", "54323" );
carManager.execute( "requestInfo", "Ford Escort", "34232" );

// at this level, we should be able to pass 
// any number of arguments to the execute method - IN A SPECIFIC ORDER
console.log(carManager.execute1("changeColor", "Subaru", "Green"));

// manually
console.log(carManager.requestInfo("Ford Mondeo", "54323"));
// console.log();




// ------------------------------------------------------
// ANOTHER EXAMPLE




// ======================================================
// ======================================================
// MEMENTO
// PURPOSE: 


