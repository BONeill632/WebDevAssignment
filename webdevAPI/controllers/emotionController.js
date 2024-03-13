const conn = require('./../utils/dbconn');

exports.index = (req, res) => {
    const userid = req.params.userid;

    const getuserSQL = `SELECT users.forename, users.surname,
        usertype.role
        FROM users
        INNER JOIN usertype on
        users.userTypeID = usertype.typeID
        WHERE users.userID = ?`;

    conn.query(getuserSQL, userid, (err, userRows) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                status: 'failure',
                message: err
            });
        } else {

            var dateLogged = req.query.dateLogged;

            const vals = [userid, dateLogged];
            const selectSQL = `SELECT * FROM emotions WHERE userID = ? AND CAST(dateLogged AS DATE) = ?`;

            conn.query(selectSQL, vals, (err, emotionRows) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        status: 'failure',
                        message: err
                    });
                } else {
                    console.log(emotionRows);
                    res.status(200).json({
                        status: 'success',
                        message: `Records found for user ${userid}`,
                        emotions: emotionRows,
                        rows: userRows
                    });
                }
            });
        }
    });
};

// EDIT GET
exports.selectEmotion = (req, res) => {
    const { id } = req.params;
    const userid = req.query.userid;

    const vals = [id, userid];
    const selectSQL = `SELECT * FROM emotions WHERE id = ? AND userID = ?`;

    conn.query(selectSQL, vals, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                status: 'failure',
                message: err
            });
        } else {
            res.status(200).json({
                status: 'success',
                message: `Record ID ${id} found`,
                rows
            });
        }
    });
};



// CREATE POST
exports.newEmotion = (req, res) => {

    // set values from body
    const vals = req.body;

    const insertSQL = `INSERT INTO emotions (userID, dateLogged, enjoyment, sadness,
        anger, contempt, disgust, fear, surprise, triggers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    conn.query(insertSQL, vals, (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            res.status(201);
            res.json({
                status: 'success',
                message: `Record ID ${rows.insertId} added`
            });
        }
    });
};


// EDIT POST
exports.updateEmotion = (req, res) => {
    const { id } = req.params;
    const userid = req.query.userid;
    const { triggers } = req.body;

    const vals = [triggers, id, userid];

    const updateSQL = `UPDATE emotions SET triggers = ?
        WHERE id = ? AND userID = ?`;

    conn.query(updateSQL, vals, (err, result) => {
        if (err) {
            res.status(500).json({
                status: 'failure',
                message: err
            });
        } else {
            res.status(200).json({
                status: 'success',
                message: `Record ID ${id} updated`
            });
        }
    });
};


// DELETE
exports.deleteEmotion = (req, res) => {
    const id = req.params.id;
    const userid = req.body.userid;

    const vals = [id, userid];
    const deleteSQL = `DELETE FROM emotions WHERE id = ? AND userID = ?`;

    conn.query(deleteSQL, vals, (err, rows) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {
            if (rows.affectedRows > 0) {
                res.status(200);
                res.json({
                    status: 'success',
                    message: `Record ID ${id} deleted`
                });
            } else {
                res.status(404);
                res.json({
                    status: 'failure',
                    message: `Invalid ID ${id}`
                });
            }
        }
    });
};

exports.timeline = (req, res) => {
    const userid = req.params.userid;
    const val = [userid];

    const getuserSQL = `
        SELECT users.forename, users.surname,
        usertype.role
        FROM users
        INNER JOIN usertype ON
        users.userTypeID = usertype.typeID
        WHERE users.userID = ?`;

    conn.query(getuserSQL, val, (err, userRows) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                status: 'failure',
                message: err
            });
        }

        const selectSQL = `SELECT * FROM emotions
        where userID = ? ORDER BY dateLogged asc`;
        conn.query(selectSQL, val, (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    status: 'failure',
                    message: err
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    message: `Record loaded`,
                    rows,
                    userRows
                });
            }
        });
    });
};