const conn = require('./../utils/dbconn');
const bcrypt = require('bcrypt');

// LOGIN POST
exports.postLogin = async (req, res) => {
    const { username, userpass } = req.body;
    const vals = [username, userpass];

    const checkuserSQL = `SELECT userID, userPassword FROM users
        WHERE emailAddress = ?`;

    conn.query(checkuserSQL, vals, async (err, rows) => {
        if (err) {
            res.status(500);
            return res.json({
                status: 'failure',
                message: err
            });
        } else if (rows.length > 0) {
            const passwordBuffer = rows[0].userPassword;

            if (passwordBuffer) {

                // Convert Buffer to string using the correct encoding
                const dbPassword = passwordBuffer.toString('utf-8');

                const isValid = await bcrypt.compare(userpass, dbPassword);

                if (isValid) {
                    // Password is correct, proceed with successful login response
                    res.status(200);
                    return res.json({
                        status: 'success',
                        message: 'Login successful',
                        userID: rows[0].userID
                    });
                } else {
                    // Password is incorrect, send failure response
                    res.status(401);
                    return res.json({
                        status: 'failure',
                        message: 'Invalid username or password'
                    });
                }
            } else {
                console.log('userPassword is undefined');
            }
        }
        res.status(404);
        return res.json({
            status: 'failure',
            message: 'Invalid username or password'
        });
    });
};



// CREATE ACCOUNT POST
exports.createAccount = async (req, res) => {
    const { forename, surname, emailAddress, userPassword } = req.body;

    const checkuserSQL = `SELECT userID FROM users WHERE
    users.emailAddress = ?`;

    const hash = await bcrypt.hash(userPassword, 10);
    const email = [emailAddress];
    const vals = [forename, surname, emailAddress, hash, 1];

    conn.query(checkuserSQL, email, (err, rows) => {
        if (err) throw err;
        const numrows = rows.length;
        if (numrows > 0) {
            res.status(406);
            res.json({
                status: 'failure',
                message: "Username already exists"
            });
        } else {
            const insertSQL = `INSERT INTO users (forename, surname, emailAddress, userPassword, userTypeID) VALUES (?, ?, ?, ?, ?)`;
            conn.query(insertSQL, vals, (err, result) => {
                if (err) {
                    res.status(500);
                    res.json({
                        status: 'failure',
                        message: err
                    });
                } else {
                    const insertId = result.insertId;
                    res.status(201);
                    res.json({
                        status: 'success',
                        message: `Record ID ${insertId} added`,
                        insertId: insertId
                    });
                }
            });
        }
    });
};

// GET USER DETAILS
exports.userDetails = (req, res) => {
    const userid = req.params.userid;

    const getuserSQL = `SELECT forename, surname, emailAddress
            FROM users WHERE userID = ?`;
    conn.query(getuserSQL, [userid], (err, result) => {
        if (err) {
            res.status(500).json({
                status: 'failure',
                message: err
            });
        } else {
            res.status(200).json({
                status: 'success',
                message: `Record ID ${userid} found`,
                result
            });
        }
    });
};

exports.updateUserDetails = async (req, res) => {
    var hash;
    let updateSQL;

    const userid = req.body[0];
    const forename = req.body[1];
    const surname = req.body[2];
    const emailAddress = req.body[3];
    const userPassword = req.body[4];
    
    const vals = [emailAddress, userid];

    console.log(JSON.stringify(req.body, null, 2));
    // Check if email address exists under a different user
    const checkuserSQL = `SELECT emailAddress FROM users WHERE emailAddress = ?
        AND userID != ?`;

    conn.query(checkuserSQL, vals, async (err, result) => {
        if (err) {
            res.status(500).json({
                status: 'failure',
            });
        } else {
            if (result.length > 0) {
                return res.status(304).json({
                    status: 'failure',
                    message: 'Username already exists'
                });
            } else {
                // If user isn't updating their password
                if (!userPassword) {
                    updateSQL = `UPDATE users
                            SET forename = ?,
                            surname = ?,
                            emailAddress = ?
                            WHERE userID = ?`;
                    updates = [forename, surname, emailAddress, userid];
                    // If user updates their password
                } else {
                    console.log(userid);
                    updateSQL = `UPDATE users
                            SET forename = ?,
                            surname = ?,
                            emailAddress = ?,
                            userPassword = ?
                            WHERE userID = ?`;
                    // encrypt new password
                    hash = await bcrypt.hash(userPassword, 10);
                    updates = [forename, surname, emailAddress, hash, userid];
                }

                conn.query(updateSQL, updates, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            status: 'failure',
                            message: '0 rows found'
                        });
                    } else {
                        res.status(200).json({
                            status: 'success',
                            message: `Record ID ${userid} updated`,
                            result
                        });
                    }
                });
            }
        }
    });
};

// DELETE USER ACCOUNT
exports.deleteAccount = (req, res) => {
    const userid = req.params.userid;

    const deleteEmotionSQL = `DELETE FROM emotions WHERE userID = ?`;

    conn.query(deleteEmotionSQL, [userid], (err) => {
        if (err) {
            res.status(500);
            res.json({
                status: 'failure',
                message: err
            });
        } else {

            const deleteUserSQL = `DELETE FROM users WHERE userID = ?`;

            conn.query(deleteUserSQL, [userid], (err) => {
                if (err) {
                    res.status(500);
                    res.json({
                        status: 'failure',
                        message: err
                    });
                } else {
                    res.status(200);
                    res.json({
                        status: 'success',
                        message: `Record ID ${userid} deleted`
                    });
                }
            });
        }
    });
};
