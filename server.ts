
import { Database, MySQLConnector, Model, DataTypes } from 'https://deno.land/x/denodb/mod.ts';

const connector = new MySQLConnector({
  database: 'f28onj0nw73cwp7m',
  host: 'un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  username: 'vy6seuao736kgme9',
  password: 'zzxoo4wj2ptj9kwa',
  port: 3306, // optional
});

const db = new Database(connector);

class Flight extends Model {
  static table = 'flights';
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    departure: DataTypes.STRING,
    destination: DataTypes.STRING,
    flightDuration: DataTypes.FLOAT,
  };

  static defaults = {
    flightDuration: 2.5,
  };
}

db.link([Flight]);

await db.sync({ drop: false });

// await Flight.create({
//   id:100,
//   departure: 'Paris',
//   destination: 'Tokyo',
// });

// or

const flight = new Flight();
flight.departure = 'London';
flight.destination = 'San Francisco';
await flight.save();

await Flight.select('destination').all();
// [ { destination: "Tokyo" }, { destination: "San Francisco" } ]

await Flight.where('destination', 'Tokyo').delete();
await Flight.where('destination', 'San Francisco').delete();


const sfFlight = await Flight.select('destination').find(2);
// { destination: "San Francisco" }

await Flight.count();
// 1

let test = await Flight.select('id', 'destination').orderBy('id').get();
console.log(test);
// [ { id: "2", destination: "San Francisco" } ]

//await sfFlight.delete();

await db.close();


