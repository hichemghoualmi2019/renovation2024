
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Client from './Client';
import Entrepreneur from './Entrepreneur';

class Projet extends Model {}

Projet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date_debut: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_fin_prevue: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: 'id',
      },
    },
    entrepreneur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Entrepreneur,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Projet',
    tableName: 'projets',
    timestamps: false,
  }
);

// Define Associations with foreignKey
Projet.belongsTo(Client, { foreignKey: 'client_id' });
Projet.belongsTo(Entrepreneur, { foreignKey: 'entrepreneur_id' });

export default Projet;

