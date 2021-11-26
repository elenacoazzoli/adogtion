// This creates the table donations
exports.up = async function up(sql) {
  console.log('Creating donations table...');
  await sql`
    CREATE TABLE donations (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
			user_id integer REFERENCES users(id) ON DELETE CASCADE,
			dog_id integer REFERENCES dogs(id) ON DELETE CASCADE,
			amount integer NOT NULL
    );
  `;
};

// This removes the table donations
exports.down = async function down(sql) {
  console.log('Dropping donations table...');
  await sql`DROP TABLE donations;`;
};
