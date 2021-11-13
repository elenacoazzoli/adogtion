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
    image:
      'https://res.cloudinary.com/adogtion/image/upload/v1636642357/pexels-helena-lopes-2253275_3_copy_ljdunt.jpg',
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
    image:
      'https://res.cloudinary.com/adogtion/image/upload/v1636642490/pexels-laura-stanley-3090875_1_copy_e9lswn.jpg',
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
    image:
      'https://res.cloudinary.com/adogtion/image/upload/v1636642587/pexels-8734665_copy_gmouzi.jpg',
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
    image:
      'https://res.cloudinary.com/adogtion/image/upload/v1636642597/pexels-melchor-gama-668004_copy_ju2oiz.jpg',
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
    image:
      'https://res.cloudinary.com/adogtion/image/upload/v1636643351/pexels-helena-lopes-4453072_uegxbm.jpg',
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
    image:
      'https://res.cloudinary.com/adogtion/image/upload/v1636642463/pexels-charles-1851164_copy_ib0ypk.jpg',
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
    image:
      'https://res.cloudinary.com/adogtion/image/upload/v1636642512/pexels-dominika-roseclay-2679612_copy_vnio78.jpg',
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
    image:
      'https://res.cloudinary.com/adogtion/image/upload/v1636642577/pexels-pixabay-164186_copy_hnplwg.jpg',
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
    image:
      'https://res.cloudinary.com/adogtion/image/upload/v1636642567/pexels-greta-hoffman-7728103_copy_fknvii.jpg',
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
    image:
      'https://res.cloudinary.com/adogtion/image/upload/v1636642559/pexels-maud-slaats-2326936_copy_ibswjp.jpg',
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
