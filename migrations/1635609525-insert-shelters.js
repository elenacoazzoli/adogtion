const shelters = [
  {
    shelter_name: 'Happy House',
    shelter_description:
      'Finding forever homes for dogs since 1991. Happy House is a no-kill shelter that rescues and cares for homeless dogs. We are a non-profit shelter for all breeds. We care for and rehabilitate our pets till the find their forever homes.',
    address: 'Via dei Mille,1000',
    region: 'Wien',
    phone: '+43699123456789',
  },
  {
    shelter_name: 'Barking Lot',
    shelter_description: 'Description for Braking Lot',
    address: 'Via dei Mille,1000',
    region: 'Burgenland',
    phone: '+43699123456789',
  },
  {
    shelter_name: 'Friends Fur-ever',
    shelter_description: 'Description for Friends Fur-ever',
    address: 'Via dei Mille,1000',
    region: 'Salzburg',
    phone: '+43699123456789',
  },
  {
    shelter_name: 'Paws Haven',
    shelter_description: 'Description for Paws Haven',
    address: 'Via dei Mille,1000',
    region: 'Tirol',
    phone: '+43699123456789',
  },
  {
    shelter_name: 'Under one woof',
    shelter_description: 'Description for Under one woof',
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
        (shelter_name, shelter_description, address, region, phone)
      VALUES
        (${shelter.shelter_name}, ${shelter.shelter_description}, ${shelter.address}, ${shelter.region}, ${shelter.phone});
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
        shelter_name = ${shelter.shelter_name} AND region = ${shelter.region};
    `;
  }
};
