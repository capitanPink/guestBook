const { pool } = require('./index');
const { dropTableString,
        createTableString,
        insetIntoTableString,
        deleteFromTableString,
        selectFromTableString } = require('./dbActionString');
const { sysMessageError, sysMessageDB } = require('../constants/notifications');


exports.createTable = async (tableName, tableCols) => {
    const client = await pool.connect();
    await client.query(createTableString(tableName, tableCols), (err, res) => {
        if (err) console.log(`${sysMessageError} ${err}`);
        else console.log(`${sysMessageDB} Table ${tableName} was successfully created.`);
    });
    client.release();
};

exports.insertData = async (tableName, tableCols, colsValue) => {
	const client = await pool.connect();
	await client.query(insetIntoTable(tableName, tableCols, colsValue), (err, res) => {
		if (err) console.log(`${sysMessageError} ${err}`);
		else console.log(`${sysMessageDB} Data into table ${tableName} was successfully passed.`);
	});
	client.release();
}

exports.selectData = async (tableName, columns, condition) => {
    const client = await pool.connect();
	let returnQuery;
    try {
        returnQuery = await client.query(selectFromTable(tableName, columns, condition));
    } catch (error) {
    	console.error(`${sysMessageError} error is raised during select data process: ${error}`)
	}
	client.release();
	return returnQuery.rows;
}

exports.deleteData = async (tableName, condition) => {
	const client = await pool.connect();
    await client.query(deleteFromTable(tableName, condition), (err, res) => {
        if (err) console.log(`${sysMessageError} ${err}`);
        else console.log(`${sysMessageDB} Data from table ${tableName} was successfully deleted.`);
    });
	client.release();
}