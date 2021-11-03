const dogs = [
  {
    dog_name: 'Gnocchi',
    dog_description: 'Description for Gnocchi',
    age: 3,
    gender: 'female',
    size: 15,
    activity_level: 'high',
    kids: true,
    pets: true,
    shelter: 2,
    service: false,
    image: 'gnocchi.jpg',
  },
  {
    dog_name: 'Pancino',
    dog_description: 'Description for Pancino',
    age: 7,
    gender: 'male',
    size: 7,
    activity_level: 'low',
    kids: true,
    pets: false,
    shelter: 1,
    service: false,
    image: 'pancino.jpg',
  },
  {
    dog_name: 'Bark Twain',
    dog_description: 'Description for Bark Twain',
    age: 8,
    gender: 'male',
    size: 20,
    activity_level: 'medium',
    kids: false,
    pets: true,
    shelter: 4,
    service: false,
    image: 'barktwain.jpg',
  },
  {
    dog_name: 'Karl Barx',
    dog_description: 'Description for Karl Barx',
    age: 5,
    gender: 'male',
    size: 17,
    activity_level: 'low',
    kids: true,
    pets: false,
    shelter: 5,
    service: false,
    image: 'karlbarx.jpg',
  },
  {
    dog_name: 'Virginia Woof',
    dog_description: 'Description for Virginia',
    age: 1,
    gender: 'female',
    size: 7,
    activity_level: 'high',
    kids: true,
    pets: true,
    shelter: 3,
    service: false,
    image: 'virginiawoof.jpg',
  },
  {
    dog_name: 'Oreo',
    dog_description: 'Description for Oreo',
    age: 11,
    gender: 'female',
    size: 10,
    activity_level: 'low',
    kids: true,
    pets: true,
    shelter: 5,
    service: false,
    image: 'oreo.jpg',
  },
  {
    dog_name: 'Camilla',
    dog_description: 'Description for Camilla',
    age: 2,
    gender: 'female',
    size: 9,
    activity_level: 'high',
    kids: true,
    pets: true,
    shelter: 2,
    service: false,
    image: 'camilla.jpg',
  },
  {
    dog_name: 'Pedro',
    dog_description: 'Description for Pedro',
    age: 8,
    gender: 'male',
    size: 9,
    activity_level: 'medium',
    kids: false,
    pets: true,
    shelter: 4,
    service: false,
    image: 'pedro.jpg',
  },
  {
    dog_name: 'Carlo Alberto',
    dog_description: 'Description for Carlo Alberto',
    age: 12,
    gender: 'male',
    size: 20,
    activity_level: 'low',
    kids: true,
    pets: true,
    shelter: 3,
    service: false,
    image: 'carloalberto.jpg',
  },
  {
    dog_name: 'Furdinand',
    dog_description: 'Description for Furdinand',
    age: 3,
    gender: 'male',
    size: 18,
    activity_level: 'high',
    kids: false,
    pets: true,
    shelter: 1,
    service: false,
    image: 'furdinand.jpg',
  },
];

exports.up = async function up(sql) {
  console.log('Inserting dogs...');

  for (const dog of dogs) {
    await sql`
      INSERT INTO dogs
        (dog_name, dog_description, age, gender, size, activity_level, kids, pets, shelter, service, image)
      VALUES
        (${dog.dog_name}, ${dog.dog_description}, ${dog.age}, ${dog.gender}, ${dog.size}, ${dog.activity_level}, ${dog.kids}, ${dog.pets}, ${dog.shelter}, ${dog.service}, ${dog.image});
    `;
  }
};

exports.down = async function down(sql) {
  console.log('Deleting dogs...');

  for (const dog of dogs) {
    await sql`
      DELETE FROM
        dogs
      WHERE
        dog_name = ${dog.dog_name} AND shelter = ${dog.shelter};
    `;
  }
};
