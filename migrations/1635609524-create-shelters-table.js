// This creates the table shelters
exports.up = async function up(sql) {
  console.log('Creating shelters table...');
  await sql`
    CREATE TABLE shelters (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      name varchar(60) NOT NULL,
      description varchar(500) NOT NULL,
			address varchar(250) NOT NULL,
			region varchar(25),
			phone varchar(20) NOT NULL
    );
  `;
};

// This removes the table shelters
exports.down = async function down(sql) {
  console.log('Dropping shelters table...');
  await sql`DROP TABLE shelters;`;
};
