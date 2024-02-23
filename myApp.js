require('dotenv').config();
let mongoose = require("mongoose")

// collects = tables
// documents = rows
// fields = columns
// schema = table definition
// schemaTypes = types of schema
// models = constructors which take schema and create an instance of a document

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // connect to db using uri

const Schema = mongoose.Schema // (presumably) destructured schema class
const personSchema = new Schema({ // schema
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema); // model 

const createAndSavePerson = (done) => {
  const tomBoom = Person({
    name: "Tom Boom",
    age: 28,
    favoriteFoods: "Watermelon"
  })
  tomBoom.save((err, data) => {
    if (err) return console.error(err)
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err)
    done(null, people)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.error(err)
    done(null, personFound)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, personFound) => {
    if (err) return console.error(err)
    done(null, personFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, personFound) => {
    if (err) return console.error(err)
    done(null, personFound);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, personFound) => {
    if (err) return console.error(err)
    personFound.favoriteFoods.push(foodToAdd)
    personFound.save((err, updatedPerson) => {
      if (err) return console.error(err)
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedPerson) => {
    if (err) return console.error(err)
    done(null, updatedPerson);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err)
    done(null, removedPerson)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, outcome) => {
    if (err) return console.error(err)
    done(null, outcome)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, people) => {
      if (err) return console.error(err)
      done(null, people);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
