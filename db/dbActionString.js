exports.dropTableString = (tableName) => (`DROP TABLE IF EXISTS ${tableName}`);

exports.createTableString = (tableName, columnsTypes) =>
    (`CREATE TABLE IF NOT EXISTS ${tableName}(${columnsTypes})`);
    
exports.insetIntoTableString = (tableName, tableColumns, tableValues) =>
    (`INSERT INTO ${tableName}(${tableColumns}) VALUES (${tableValues})`);

exports.deleteFromTableString = (tableName, condition) =>
    (`DELETE FROM ${tableName} WHERE ${condition}`);
    
exports.selectFromTableString = (tableName, columns, condition) =>
    (`SELECT ${columns} FROM ${tableName} WHERE ${condition}`);