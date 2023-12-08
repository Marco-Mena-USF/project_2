/**
 * Helper function for generating SQL query components for a partial update.
 *
 * @param {Object} dataToUpdate - The object containing data to be updated in the database.
 * @param {Object} jsToSql - An optional mapping of JavaScript field names to their corresponding SQL column names.
 *
 * @returns {Object} - An object with two properties:
 *   - setCols: A string containing the comma-separated SQL column assignments for the update statement.
 *   - values: An array of the corresponding values to be updated in the database.
 *
 * @throws {BadRequestError} - If no data is provided for the update.
 *
 * @example
 * const dataToUpdate = { firstName: 'Aliya', age: 32 };
 * const jsToSql = { firstName: 'first_name' };
 * const { setCols, values } = sqlForPartialUpdate(dataToUpdate, jsToSql);
 * // setCols: '"first_name"=$1, "age"=$2'
 * // values: ['Aliya', 32]
 */
const { BadRequestError } = require("../expressError");

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  // Extract keys from the provided data object
  const keys = Object.keys(dataToUpdate);

  // Throw an error if no data is provided for the update
  if (keys.length === 0) {
    throw new BadRequestError("No data");
  }

  // Map keys to their corresponding SQL column assignments
  const cols = keys.map((colName, idx) =>
    `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  // Return an object with setCols and values properties
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

// Export the function for external use
module.exports = { sqlForPartialUpdate };