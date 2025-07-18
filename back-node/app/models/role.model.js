module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  return Role;
};
