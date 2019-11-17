module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('students', 'dateofbirth', {
      type: Sequelize.DATE,
      allownull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('students', 'dateofbirth');
  },
};
