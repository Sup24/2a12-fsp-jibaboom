# Code Style

This documents helps to guide the look and feel of the code so that even when there are multiple developer, the style remains consistent. You may read more about it [here](https://javascript.info/coding-style).

## Style Guide

| Rules             | Choices                         | What we chose
| ----------------- | ------------------------------- | -------------------------
| Case Styles       | camelCase/snake_case/PascalCase | camelCase SELECTED       |
| Acronym Case      | IBM/Ibm/ibm                     | Ibm SELECTED             |
| Indentation Style | Allman/1TBS                     | 1TBS SELECTED            |
| Indentation       | Tabs/Space                      | Tabs SELECTED            |
| Indentation Space | 2/4 spaces                      | 2 spaces SELECTED        |
| Semicolon         | Optional/Mandatory              | Mandatory SELECTED       |

## Examples

Based on your chosen rules, give an example of a code that follows the code style and an example of a code that does not follow the code style. The examples you give should cover all the above defined rule.

### Good Example

```js
```

Note to Lecturer: For indentations, kindly view it through VSCode as GitHub receives these differently, thank you!

**Case Styles (Using Camel Case from backend.js):**

    function coinChange(coinsObj, amount) {
        const coinReq = new Array(amount + 1).fill(null).map((_) => []);
        const coins = coinsObj.map(({ value }) => parseInt(value));
        const l = coins.length;
        for (let amt = 1; amt <= amount; amt++) {
            for (let j = 0; j < l; j++) {
                if (coins[j] <= amt) {
                    if (coinReq[amt].length === 0 || coinReq[amt - coins[j]].length + 1 < coinReq[amt].length) {
                        coinReq[amt] = [...coinReq[amt - coins[j]], coins[j]];
                    }
                }
            }
        }
        return coinReq[amount].reduce((result, coin) => {
            if (!result[coin]) result[coin] = 0;
            result[coin]++;
            return result;
        }, {});
    }



**Indentation Space (2/4 Spaces from database.js):**

    function insertCoins(coins, callback) {
        let i = 1;
        const template = coins.map((coin) => `($${i++}, $${i++}, $${i++})`).join(',');
        const values = coins.reduce((reduced, coin) => [...reduced, coin.coinId, coin.countryId, coin.value],[]);
        const query = `INSERT INTO coin (coin_id, country_id, value) VALUES ${template};`;
        const client = connect();
        console.log(values, query);
        client.query(query, values, (err, result) => {
            callback(err, result);
            client.end();
        });
    }



**Indentation (Tabs/Spaces from database.js):**

    function getCoinsForComputation(countryId, callback) {
        const client = connect();
        client.query(`SELECT * FROM coin WHERE country_id = $1`, [countryId], (err, result) => {
            client.end();
            if (err) return callback(err, result);
            const { rows } = result;
            callback(err, rows);
        });
    }



**Semicolon (From index.js):**

    function refreshBasicResultTable() {
        getBasicResultFromBackend(function(error, data) {
            if (error) return alert(JSON.stringify(error));
            populateBasicResultTable(data);
        });
    }

    function compute() {
        $('#basic-result-input-form input')
        .not(':input[type-submit]')
        .each((idx, input) => {
            basicResultQuery[$(input).attr('key')] = $(input).val();
        });
        refreshBasicResultTable();
        return false;
    }

    function registerBasicResultInput() {
        $('#basic-result-input-form').submit(compute);
    }

    $(document).ready(function(){
        registerBasicFilterForm();
        registerBasicDataPaginationForm();
        registerBasicResultInput();
        refreshBasicDataTable();
    });



**Acronym Case (from app.js):**

    app.use(function(req, res, next) {
    next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        error: err.message,
        code: err.status || 500,
    });
    });

    module.exports = app;



**Indentation Style (1 True Brace Style from database.js):**

    function getCoins(countryId, value__gt, page = 0, pageSize = 10, callback) {
        let whereClause;
        let i = 1;
        const values = [];
        if (!countryId && !value__gt) whereClause = '';
        else {
            whereClause = 'WHERE ';
            if (countryId) {
                whereClause += `country_Id = $${i++}`;
                values.push(parseInt(countryId));
            };
            if (value__gt) {
                whereClause += (countryId) ? ` AND value > $${i++}` : `value > $${i++}`;
            values.push(parseInt(value__gt));
            };
        }
        let limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`;
        values.push(parseInt(pageSize)); // limit = page size
        values.push(parseInt(page) * parseInt(pageSize)); // offset page * pageSize
        const query = `SELECT * FROM coin ${whereClause} ${limitOffsetClause}`;

        const client = connect();
        client.query(query,values,function(err, result){
            client.end();
            if (err) return callback(err, result);
            const { rows } = result;
            callback(err,rows);
        })
    }


### Bad Example

```js
```

**Case Styles (Using Camel Case from backend.js):**

    function CoinChange(CoinsObj, amount) {
        const CoinReq = new Array(amount + 1).fill(null).map((_) => []);
        const coins = CoinsObj.map(({ value }) => ParseInt(value));
        const l = coins.length;
        for (let amt = 1; amt <= amount; amt++) {
            for (let j = 0; j < l; j++) {
                if (coins[j] <= amt) {
                    if (CoinReq[amt].length === 0 || Coinreq[amt - coins[j]].length + 1 < coinreq[amt].length) {
                        Coinreq[amt] = [...Coinreq[amt - coins[j]], coins[j]];
                    }
                }
            }
        }
        return coinreq[amount].reduce((result, coin) => {
            if (!result[coin]) result[coin] = 0;
            result[coin]++;
            return result;
        }, {});
    }



**Indentation Space (2/4 Spaces from database.js, odd number of spaces):**

    function insertCoins(coins, callback) {
    let i = 1;
    const template = coins.map((coin) => `($${i++}, $${i++}, $${i++})`).join(',');
    const values = coins.reduce((reduced, coin) => [...reduced, coin.coinId, coin.countryId, coin.value],[]);
    const query = `INSERT INTO coin (coin_id, country_id, value) VALUES ${template};`;
    const client = connect();
    console.log(values, query);
    client.query(query, values, (err, result) => {
        callback(err, result);
        client.end();
        });
    }



**Indentation (Tabs/Spaces from database.js, uneven spread of spaces):**

    function getCoinsForComputation(countryId, callback) {
                        const client = connect();
                client.query(`SELECT * FROM coin WHERE country_id = $1`, [countryId], (err, result) => {
                                client.end();
        if (err) return callback(err, result);
    const { rows } = result;
    callback(err, rows);
        });
    }



**Semicolon (From index.js, absence of semicolons to reduce vulnerability of code error):**

    function refreshBasicResultTable() {
        getBasicResultFromBackend(function(error, data) {
            if (error) return alert(JSON.stringify(error))
            populateBasicResultTable(data)
        });
    }

    function compute() {
        $('#basic-result-input-form input')
        .not(':input[type-submit]')
        .each((idx, input) => {
            basicResultQuery[$(input).attr('key')] = $(input).val()
        })
        refreshBasicResultTable()
        return false
    }

    function registerBasicResultInput() {
        $('#basic-result-input-form').submit(compute)
    }

    $(document).ready(function(){
        registerBasicFilterForm()
        registerBasicDataPaginationForm()
        registerBasicResultInput()
        refreshBasicDataTable()
    });



**Acronym Case (from app.js, capitalisations of acronyms are incorrect):**

    app.uSE(function(rEQ, rES, next) {
    next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    rES.locals.message = err.message;
    res.locals.error = req.app.gET('env') === 'development' ? eRR : {};

    // render the error page
    rES.status(eRR.status || 500);
    rES.json({
        error: eRR.message,
        code: eRR.status || 500,
    });
    });

    module.exports = aPP;



**Indentation Style (1 True Brace Style from database.js, if, else, while, for, statements have no braces):**

    function getCoins(countryId, value__gt, page = 0, pageSize = 10, callback) 
        let whereClause;
        let i = 1;
        const values = [];
        if (!countryId && !value__gt) whereClause = '';
        else 
            whereClause = 'WHERE ';
            if (countryId) 
                whereClause += `country_Id = $${i++}`;
                values.push(parseInt(countryId));
            ;
            if (value__gt) 
                whereClause += (countryId) ? ` AND value > $${i++}` : `value > $${i++}`;
            values.push(parseInt(value__gt));
            ;
        
        let limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`;
        values.push(parseInt(pageSize)); // limit = page size
        values.push(parseInt(page) * parseInt(pageSize)); // offset page * pageSize
        const query = `SELECT * FROM coin ${whereClause} ${limitOffsetClause}`;

        const client = connect();
        client.query(query,values,function(err, result)
            client.end();
            if (err) return callback(err, result);
            const { rows } = result;
            callback(err,rows);
        )
