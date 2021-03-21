const mysql = require('mysql');
const exec = require('child_process').exec;

function createConnection() {
    return mysql.createConnection({
        connectionLimit : 10,
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'product-scrapping-service'
    });
}

var connectionSelectProducts = createConnection();

connectionSelectProducts.connect();
connectionSelectProducts.query("SELECT id, amazon_id FROM product", function (error, rows, fields) {
    if (error) throw error;
    for (let rowIndex in rows) {
        const productId = rows[rowIndex].id;
        const amazonProductId = rows[rowIndex].amazon_id;
        exec(`node amazon_price_scrapper.js ${amazonProductId}`, (error, stdout, stderr) => {
            if (error) throw error;
            const productPrice = stdout.trim().replace(',', '.');

            const connectionUpdatePriceProducts = createConnection();
            connectionUpdatePriceProducts.connect();
            connectionUpdatePriceProducts.query(`UPDATE product SET price = '${productPrice}', last_update=now() WHERE id = ${productId}`, function (err, result) {
                if (err) throw err;
                console.log(`Update productId=${productId} (${amazonProductId}) with price ${productPrice}`);
            });
            connectionUpdatePriceProducts.end();
        });
    }
});

connectionSelectProducts.end()