const shelters = [
  {
    name: 'Happy House',
    description: 'Description for Happy House',
    address: 'Via dei Mille,1000',
    region: 'Wien',
    phone: '+43699123456789',
  },
  {
    name: 'Barking Lot',
    description: 'Description for Braking Lot',
    address: 'Via dei Mille,1000',
    region: 'Burgenland',
    phone: '+43699123456789',
  },
  {
    name: 'Friends Fur-ever',
    description: 'Description for Friends Fur-ever',
    address: 'Via dei Mille,1000',
    region: 'Salzburg',
    phone: '+43699123456789',
  },
  {
    name: 'Paws Haven',
    description: 'Description for Paws Haven',
    address: 'Via dei Mille,1000',
    region: 'Tirol',
    phone: '+43699123456789',
  },
  {
    name: 'Under one woof',
    description: 'Description for Under one woof',
    address: 'Via dei Mille,1000',
    region: 'Voralberg',
    phone: '+43699123456789',
  },
];

exports.up = async function up(sql) {
  console.log('Inserting shelters...');

  for (const shelter of shelters) {
    await sql`
      INSERT INTO shelters
        (name, description, address, region, phone)
      VALUES
        (${shelter.name}, ${shelter.description}, ${shelter.address}, ${shelter.region}, ${shelter.phone});
    `;
  }
};

exports.down = async function down(sql) {
  console.log('Deleting shelters...');

  for (const shelter of shelters) {
    await sql`
      DELETE FROM
        shelters
      WHERE
        name = ${shelter.name} AND region = ${shelter.region};
    `;
  }
};
