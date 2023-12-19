const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Project = sequelize.define("project", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  stage: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  descr: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  img: { type: DataTypes.STRING, allowNull: false },
  pageImg: { type: DataTypes.STRING, allowNull: false },
});

const ProjectInfo = sequelize.define("project_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  description: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  projectId: {
    type: DataTypes.INTEGER,
    references: {
      model: Project,
      key: "id",
    },
  },
});

const ProjectCategory = sequelize.define("project_category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Project,
      key: "id",
    },
  },
});

const Card = sequelize.define("card", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  // images: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    validate: {
      min: {
        args: 1,
        msg: 'Минимум одно изображение должно быть указано',
      },
    },
  },
});

const SocialLink = sequelize.define("social_link", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  platform: { type: DataTypes.STRING, allowNull: false }, // Название социальной сети
  url: { type: DataTypes.STRING, allowNull: false }, // URL ссылки
});

const CardImage = sequelize.define("card_image", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fileName: { type: DataTypes.STRING, allowNull: false },
  cardId: {
    type: DataTypes.INTEGER,
    references: {
      model: Card,
      key: "id",
    },
  },
});


Card.hasMany(CardImage, { as: "cardImages" }); // Используйте другое имя, например, "cardImages"
CardImage.belongsTo(Card);

ProjectCategory.hasMany(Project, { as: "projects" });
Project.belongsTo(ProjectCategory);

Project.hasMany(ProjectInfo, { as: "info" });
ProjectInfo.belongsTo(Project);

Project.hasMany(Card, { as: "cards" });
Card.belongsTo(Project);


module.exports = {
  Project,
  User,
  ProjectInfo,
  ProjectCategory,
  Card,
  SocialLink,
  CardImage,
};
