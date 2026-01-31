// Part 1: Shape, Rectangle, Square

// Shape (Abstract)
function Shape() {
    if (this.constructor === Shape) throw new Error("Cannot create Shape");
}

// Rectangle
function Rectangle(w, h) {
    Shape.call(this);
    this._width = w;
    this._height = h;
}
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
Rectangle.prototype.toString = function() { 
    return "Rectangle: " + this._width + "x" + this._height + ", area=" + (this._width * this._height); 
};
Rectangle.prototype.valueOf = function() { return this._width * this._height; };

// Square
function Square(side) {
    Rectangle.call(this, side, side);
    Square.count++;
}
Square.count = 0;
Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;
Square.prototype.toString = function() { 
    return "Square: " + this._width + ", area=" + (this._width * this._width); 
};

// Part 2: Vehicle Hierarchy

// Vehicle
function Vehicle(speed, color) {
    if (typeof speed !== 'number' || typeof color !== 'number') throw new Error("Invalid type");
    this._speed = speed;
    this._color = color;
}
Vehicle.prototype.turnLeft = function() { return "Left"; };
Vehicle.prototype.turnRight = function() { return "Right"; };
Vehicle.prototype.start = function() { return true; };
Vehicle.prototype.stop = function() { return true; };
Vehicle.prototype.goBackward = function(s, a) { return "Backward " + s; };
Vehicle.prototype.goForward = function(s, a) { return "Forward " + s; };
Vehicle.prototype.toString = function() { return "Vehicle [" + this._speed + "," + this._color + "]"; };
Vehicle.prototype.valueOf = function() { return this._speed; };

// Bicycle
function Bicycle(speed, color) {
    Vehicle.call(this, speed, color);
}
Bicycle.prototype = Object.create(Vehicle.prototype);
Bicycle.prototype.constructor = Bicycle;
Bicycle.prototype.ringBell = function() { return "Ring!"; };
Bicycle.prototype.toString = function() { return "Bicycle [" + this._speed + "]"; };

// MotorVehicle
function MotorVehicle(speed, color, engine, plate) {
    Vehicle.call(this, speed, color);
    if (typeof engine !== 'number' || typeof plate !== 'string') throw new TypeError("Invalid type");
    this._engine = engine;
    this._plate = plate;
}
MotorVehicle.prototype = Object.create(Vehicle.prototype);
MotorVehicle.prototype.constructor = MotorVehicle;
MotorVehicle.prototype.getSizeOfEngine = function() { return this._engine; };
MotorVehicle.prototype.getLicensePlate = function() { return this._plate; };
MotorVehicle.prototype.toString = function() { return "MotorVehicle [" + this._plate + "]"; };

// Car
function Car(speed, color, engine, plate, doors, wheels, weight) {
    MotorVehicle.call(this, speed, color, engine, plate);
    if (typeof doors !== 'number' || typeof wheels !== 'number' || typeof weight !== 'number') throw new TypeError("Invalid type");
    this._doors = doors;
    this._wheels = wheels;
    this._weight = weight;
}
Car.prototype = Object.create(MotorVehicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.switchOnAirCon = function() { return "AC ON"; };
Car.prototype.getNumOfDoors = function() { return this._doors; };
Car.prototype.toString = function() { return "Car [doors=" + this._doors + "]"; };
Car.prototype.valueOf = function() { return this._doors; };

// DumpTruck
function DumpTruck(speed, color, engine, plate, capacity, wheels, weight) {
    MotorVehicle.call(this, speed, color, engine, plate);
    if (typeof capacity !== 'number' || typeof wheels !== 'number' || typeof weight !== 'number') throw new TypeError("Invalid type");
    this._capacity = capacity;
    this._wheels = wheels;
    this._weight = weight;
}
DumpTruck.prototype = Object.create(MotorVehicle.prototype);
DumpTruck.prototype.constructor = DumpTruck;
DumpTruck.prototype.lowerLoad = function() { return "Lower"; };
DumpTruck.prototype.raiseLoad = function() { return "Raise"; };
DumpTruck.prototype.toString = function() { return "DumpTruck [capacity=" + this._capacity + "]"; };
DumpTruck.prototype.valueOf = function() { return this._capacity; };

// TESTS

console.log("=== PART 1 ===");
try { var s = new Shape(); } catch(e) { console.log(e.message); }

var r1 = new Rectangle(10, 6);
var r2 = new Rectangle(7, 5);
console.log(r1.toString());
console.log("r1 + r2 = " + (r1 + r2));
console.log("r1 - r2 = " + (r1 - r2));

var sq = new Square(5);
console.log(sq.toString());
console.log("Squares: " + Square.count);

console.log("\n=== PART 2 ===");
var bike = new Bicycle(20, 255);
console.log(bike.toString());
console.log(bike.ringBell());

var car = new Car(100, 200, 2000, "ABC-123", 4, 4, 1500);
console.log(car.toString());
console.log(car.switchOnAirCon());

var truck = new DumpTruck(80, 128, 5000, "TR-001", 10000, 6, 8000);
console.log(truck.toString());
console.log(truck.raiseLoad());