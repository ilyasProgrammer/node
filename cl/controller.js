const db = require("./models");
const Company = db.company;
const User = db.user;
const Worker = db.worker;
const Op = db.Sequelize.Op;

// Companies
exports.createCompany = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const company = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };
  Company.create(company)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    });
};
exports.findAllCompanies = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Company.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Companies."
      });
    });
};
exports.getCompaniesWithWorkers = (req, res) => {
  Company.findAll({include: [{model: Worker}]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving CompaniesWithWorkers."
        });
      });
};
exports.getWorkersOfCompany = (req, res) => {
  const companyId = req.params.companyId;
  var condition = companyId ? { id: companyId} : null;
  Company.findAll({ where: condition, include: [{model: Worker}]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving WorkersOfCompany."
        });
      });
};
exports.updateCompany = (req, res) => {
  const id = req.params.id;

  Company.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Company was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Company with id=" + id
      });
    });
};
exports.deleteCompany = (req, res) => {
  const id = req.params.id;

  Company.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Company was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Company with id=${id}. Maybe Company was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Company with id=" + id
      });
    });
};

// Workers
exports.createWorker = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Worker.create({name: req.body.name, email: req.body.email, CompanyId: req.body.CompanyId})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while creating the Worker."
        });
      });
};
exports.findAllWorkers = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Worker.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Workers."
      });
    });
};
exports.updateWorker = (req, res) => {
  const id = req.params.id;

  Worker.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Worker was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Worker with id=${id}. Maybe Worker was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Worker with id=" + id
      });
    });
};
exports.deleteWorker = (req, res) => {
  const id = req.params.id;

  Worker.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Worker was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Worker with id=${id}. Maybe Worker was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Worker with id=" + id
      });
    });
};

// Users
exports.createUser = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  User.create({name: req.body.name, email: req.body.email})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while creating the User."
        });
      });
};
exports.findAllUsers = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};
exports.updateUser = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};
