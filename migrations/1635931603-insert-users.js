const users = [
  {
    username: 'ecoazzoli',
    password_hash:
      '$2b$10$Nra68NN7jcoMbx9edq5Oi.U8Ym8sMxp9bDfcWp3JCXhEc7MNVNvZ2',
    role_id: 2,
    shelter_id: 3,
  },
  {
    username: 'adopter',
    password_hash:
      '$2b$10$W7s0rgVMjOxWQ2fxQ/cZ5.s0dLCK0tNdh0sKDf/CVmj3qQA3D8NnS',
    role_id: 1,
    shelter_id: null,
  },
];

exports.up = async function up(sql) {
  console.log('Inserting users...');

  for (const user of users) {
    await sql`
      INSERT INTO users
        (username, password_hash, role_id, shelter_id)
      VALUES
        (${user.username}, ${user.password_hash}, ${user.role_id}, ${user.shelter_id});
    `;
  }
};

exports.down = async function down(sql) {
  console.log('Deleting users...');

  for (const user of users) {
    await sql`
      DELETE FROM
        users
      WHERE
        username = ${user.username} AND password_hash = ${user.password_hash};
    `;
  }
};
