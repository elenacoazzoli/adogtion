const profiles = [
  {
    user_id: 1,
    name: 'Admin Name',
    surname: 'Admin surname',
    email: 'shelteradmin@gmail.com',
    gender: null,
    size: null,
    age: null,
    activity_level: null,
    kids: null,
    pets: null,
    service: null,
  },
  {
    user_id: 2,
    name: 'Adopter Name',
    surname: 'Adopter Surname',
    email: 'adopterprofile@gmail.com',
    gender: null,
    size: null,
    age: null,
    activity_level: null,
    kids: null,
    pets: null,
    service: null,
  },
];

exports.up = async function up(sql) {
  console.log('Inserting profiles...');

  for (const profile of profiles) {
    await sql`
      INSERT INTO profiles
        (user_id, name, surname, email, gender, size, age, activity_level, kids, pets, service)
      VALUES
        (${profile.user_id}, ${profile.name}, ${profile.surname}, ${profile.email},${profile.gender}, ${profile.size}, ${profile.age}, ${profile.activity_level}, ${profile.kids}, ${profile.pets}, ${profile.service});
    `;
  }
};

exports.down = async function down(sql) {
  console.log('Deleting profiles...');

  for (const profile of profiles) {
    await sql`
      DELETE FROM
        profiles
      WHERE
        name = ${profile.username} AND user_id = ${profile.user_id};
    `;
  }
};
