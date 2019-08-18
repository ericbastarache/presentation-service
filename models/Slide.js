const Sequelize = require('sequelize');

const sequelize = new Sequelize('presentation', 'presentation_user', 'password',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            collate: 'utf8_general_ci',
            timezone: 'America/Toronto',
          },
          timezone: 'America/Toronto',
    }
)

const Model = Sequelize.Model;

class Slide extends Model {}

Slide.init({
    // attributes
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'slide'
  });

module.exports = Slide;