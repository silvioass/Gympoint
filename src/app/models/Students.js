import Sequelize, { Model } from 'sequelize';

class Students extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        email_old: Sequelize.VIRTUAL,
        email_confirm: Sequelize.VIRTUAL,
        dateofbirth: Sequelize.DATE,
        weight: Sequelize.DECIMAL,
        size: Sequelize.DECIMAL,
      },
      { sequelize }
    );
  }
}

export default Students;
