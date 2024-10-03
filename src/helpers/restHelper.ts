import { Op, Order } from 'sequelize'; // Add this line

export const buildWhereClause = (nom: string | undefined, startDate: string | undefined, endDate: string | undefined) => {
    const whereClause: any = {};
  
    if (nom) {
      whereClause.nom = { [Op.like]: `%${nom}%` };
    }
  
    if (startDate && endDate) {
      whereClause.date_debut = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }
  
    return whereClause;
  };

export const getOrderClause = (sortBy: string | undefined): Order => {
    switch (sortBy) {
      case 'date_fin_prevue':
        return [['date_fin_prevue', 'ASC']];
      case 'nom':
        return [['nom', 'ASC']];
      default:
        return [['date_debut', 'ASC']]; // Default sorting
    }
  };

export const getPagination = (page: string | undefined, limit: number = 50) => {
    const currentPage = page ? parseInt(page, 10) : 1;
    const offset = (currentPage - 1) * limit;
  
    return { limit, offset, currentPage };
  };
  
  