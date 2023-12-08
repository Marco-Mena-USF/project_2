const { sqlForPartialUpdate } = require('./sqlForPartialUpdate');
const { BadRequestError } = require('./expressError');

describe('sqlForPartialUpdate', () => {
  // Test case 1
  test('Generates SQL components for a partial update', () => {
    const dataToUpdate = { firstName: 'Aliya', age: 32 };
    const jsToSql = { firstName: 'first_name' };

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ['Aliya', 32],
    });
  });

  // Test case 2
  test('Generates SQL components with default column names', () => {
    const dataToUpdate = { firstName: 'Aliya', age: 32 };

    const result = sqlForPartialUpdate(dataToUpdate);

    expect(result).toEqual({
      setCols: '"firstName"=$1, "age"=$2',
      values: ['Aliya', 32],
    });
  });

  // Test case 3
  test('Throws BadRequestError when no data is provided', () => {
    const dataToUpdate = {};
    const jsToSql = {};

    // Wrap the function call in a function to assert the error
    const callFunction = () => sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(callFunction).toThrowError(BadRequestError);
    expect(callFunction).toThrowError('No data');
  });
});