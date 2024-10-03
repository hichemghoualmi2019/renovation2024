import { buildWhereClause, getOrderClause, getPagination } from '../helpers/restHelper'; // Update with the correct path
import { Op, Order } from 'sequelize';

// Unit tests for buildWhereClause
describe('buildWhereClause', () => {
  it('should return an empty object if no parameters are provided', () => {
    const result = buildWhereClause(undefined, undefined, undefined);
    expect(result).toEqual({});
  });

  it('should return a where clause for nom', () => {
    const result = buildWhereClause('test', undefined, undefined);
    expect(result).toEqual({
      nom: {
        [Op.like]: '%test%',
      },
    });
  });

  it('should return a where clause for date range', () => {
    const result = buildWhereClause(undefined, '2024-01-01', '2024-12-31');
    expect(result).toEqual({
      date_debut: {
        [Op.between]: [new Date('2024-01-01'), new Date('2024-12-31')],
      },
    });
  });

  it('should return a where clause for both nom and date range', () => {
    const result = buildWhereClause('test', '2024-01-01', '2024-12-31');
    expect(result).toEqual({
      nom: {
        [Op.like]: '%test%',
      },
      date_debut: {
        [Op.between]: [new Date('2024-01-01'), new Date('2024-12-31')],
      },
    });
  });
});

// Unit tests for getOrderClause
describe('getOrderClause', () => {
  it('should return default order by date_debut when no sortBy is provided', () => {
    const result: Order = getOrderClause(undefined);
    expect(result).toEqual([['date_debut', 'ASC']]);
  });

  it('should return order by date_fin_prevue when sortBy is date_fin_prevue', () => {
    const result: Order = getOrderClause('date_fin_prevue');
    expect(result).toEqual([['date_fin_prevue', 'ASC']]);
  });

  it('should return order by nom when sortBy is nom', () => {
    const result: Order = getOrderClause('nom');
    expect(result).toEqual([['nom', 'ASC']]);
  });
});

// Unit tests for getPagination
describe('getPagination', () => {
  it('should return default pagination with page 1 and limit 50 when no parameters are provided', () => {
    const result = getPagination(undefined);
    expect(result).toEqual({
      limit: 50,
      offset: 0,
      currentPage: 1,
    });
  });

  it('should return correct pagination for a specific page', () => {
    const result = getPagination('3');
    expect(result).toEqual({
      limit: 50,
      offset: 100,
      currentPage: 3,
    });
  });

  it('should return correct pagination when a custom limit is provided', () => {
    const result = getPagination('2', 20);
    expect(result).toEqual({
      limit: 20,
      offset: 20,
      currentPage: 2,
    });
  });
});
