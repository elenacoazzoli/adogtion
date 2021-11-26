const dogs = [
  {
    dog_name: 'Gnocchi',
    dog_description:
      'When I am not bounding around the agility course, I am playing hide and seek with my carers. I am really good at meeting new people and super cuddly around kids and little humans.',
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
    dog_description:
      "I love spending most of my time going on walks to the Donau where I get to go in for a little dip in the water, it's so much fun! There's nothing I love more than a cuddle with my favourite carer, or a good long nap! I have a really difficult time sharing my food and bed with my doggy friends, so when they come near me it makes me really anxious.",
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
    dog_description:
      'I love to spend my time outdoors, pursuing my favourite hobby, birdwatching! Every time I spot one, I get super excited and make sure to let everyone know by giving a big bark! Although if it starts raining, I will be back inside in a flash. I am not the biggest fan of bad weather and I especially do not like getting my fur wet!',
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
    dog_description:
      'Although I am a bit old, I still enjoy life to the full! I love spending time on the sofa and spending time with my caregivers. I love being around new people and if you give me treats, I will be your new best friend. As age is catching up on me, I need special care and support from vets and specialists.',
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
    dog_description:
      'I am a cheeky chappy with a lot of energy and, as I am sure you can imagine, I love doing zoomies around and around the paddocks all day! Although when I am not racing around the fields, you will find me trying to master some fun food games! I can still be a little bit wary around people and kids when I first meet them.',
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
