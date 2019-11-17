module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('students', 'age');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('students', 'age', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
