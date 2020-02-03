const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'ra',
  host: 'localhost',
  database: 'amcrm',
  password: '12',
  port: 5432,
});

// Companies
const getCompanies = (request, response) => {
  pool.query(`select company.name as Company, individual.individual_cnt as Employees
              from res_partner company
              inner join (select parent_id, sum(1) individual_cnt from res_partner where parent_id is not NULL group by parent_id) as individual on individual.parent_id = company.id
              where company.is_company = TRUE
              order by company.name`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};
const getCompaniesWithUsers = (request, response) => {
  pool.query(`select company.name, individual.name
              from res_partner company
              inner join res_partner individual on individual.parent_id = company.id
              where company.is_company = TRUE
              order by company.name, individual.name`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};
const getUsersOfCompany = (request, response) => {
  const id = parseInt(request.params.companyId);
  pool.query(`select company.id, company.name, string_agg(individual.name, ',') Individuals
              from res_partner company
              inner join res_partner individual on individual.parent_id = company.id
              where company.is_company = TRUE AND company.id = $1
              group by company.id
              order by company.name`, [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};
const createCompany = (request, response) => {
  const {name, email, phone} = request.body;

  pool.query('INSERT INTO res_partner (name, email, marker_color, is_company, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id', [name, email, "red", "TRUE", phone], (error, results) => {
    if (error) {
      response.status(400).send(`Error: ${error}`);
      return //TODO whats correct here ?
    }
    response.status(201).send(`Company added with ID: ${results.rows[0].id}`)
  })
};
const updateCompany = (request, response) => {
  const id = parseInt(request.params.id);
  var qry = composeUpdateTable(id, 'res_partner', request.body);
  var colValues = Object.keys(request.body).map(function (key) {
    return request.body[key];
  });
  pool.query(qry, colValues, (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Company modified with ID: ${results.rows[0].id}`)
      }
  )
};
const deleteCompany = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM res_partner WHERE id = $1 AND is_company = TRUE', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
};


// Individuals
const getUsers = (request, response) => {
  pool.query('SELECT * FROM res_partner where is_company = FALSE', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};
const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query('INSERT INTO res_partner (name, email, marker_color, is_company) VALUES ($1, $2, $3, $4)', [name, email, "red", false], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
};
const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    'UPDATE res_partner SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
};
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM res_partner WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
};

// Tech
function composeUpdateTable (id, table, cols) {
  var query = ['UPDATE '+ table];
  query.push('SET');
  var set = [];
  Object.keys(cols).forEach(function (key, i) {
    set.push(key + ' = ($' + (i + 1) + ')');
  });
  query.push(set.join(', '));
  query.push('WHERE id = ' + id );
  query.push('RETURNING id' );
  return query.join(' ');
}

module.exports = {
  getCompanies,
  createCompany,
  deleteCompany,
  updateCompany,
  getCompaniesWithUsers,
  getUsersOfCompany,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
