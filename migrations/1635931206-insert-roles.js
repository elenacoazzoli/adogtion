const roles = [{ role: 'adopter' }, { role: 'shelter admin' }];

exports.up = async function up(sql) {
  console.log('Inserting roles...');

  for (const userrole of roles) {
    await sql`
				INSERT INTO roles
					(role)
				VALUES
					(${userrole.role});
			`;
  }
};

exports.down = async function down(sql) {
  console.log('Deleting roles...');

  for (const userrole of roles) {
    await sql`
				DELETE FROM
					roles
				WHERE
					role = ${userrole.role};
			`;
  }
};
