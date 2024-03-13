const dayjs = require('dayjs');
const axios = require('axios');

// LOGIN GET
exports.getLogin = (req, res) => {
    const { isloggedin } = req.session;
    if (!isloggedin) {
        if (!req.session.returnTo) {
            req.session.returnTo = req.originalUrl;
        }
        res.render('login', { errorMessage: null });
    }
    else {
        res.redirect('/index');
    }
};

// LOGIN POST
exports.postLogin = async (req, res) => {
    const { username, userpass } = req.body; // Destructure the values from req.body

    const endpoint = `http://localhost:4001/users`;

    try {
        const response = await axios
            .post(endpoint, { username, userpass },
                { validateStatus: (status) => status < 500 });

        if (response.status === 200) {
            // Login successful
            const userData = response.data;
            const session = req.session;
            session.isloggedin = true;
            session.userid = userData.userID;

            // Redirect to index
            const redirectRoute = session.returnTo === '/login' ? '/index' : session.returnTo;
            res.redirect(req.baseUrl + redirectRoute);
        } else {
            // Invalid credentials
            res.render('login', { errorMessage: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

// LOGOUT
exports.getLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/index');
    });
};

// CREATE ACCOUNT GET
exports.getCreateAccount = (req, res) => {

    req.session.returnTo = req.originalUrl;

    console.log(req.session.returnTo);
    res.render('createAccount', { errorMessage: null });
};

// CREATE ACCOUNT POST
exports.createAccount = async (req, res) => {
    const { forename, surname, emailAddress, userPassword } = req.body;

    const endpoint = `http://localhost:4001/users/new`;

    try {
        const response = await axios
            .post(endpoint, { forename, surname, emailAddress, userPassword });

        if (response.status === 201) {

            // Create account successful
            const session = req.session;
            session.isloggedin = true;
            session.userid = response.data.insertId;

            // Redirect to index
            const redirectRoute = session.returnTo === '/createAccount' ? '/index' : session.returnTo;

            res.redirect(req.baseUrl + redirectRoute);
        }
    } catch (error) {
        // Invalid credentials
        res.render('createAccount', { errorMessage: "Username already exists" });
    }
};

// LOGIN POST
exports.postLogin = async (req, res) => {
    const { username, userpass } = req.body; // Destructure the values from req.body

    const endpoint = `http://localhost:4001/users`;

    try {
        const response = await axios
            .post(endpoint, { username, userpass },
                { validateStatus: (status) => status < 500 });

        if (response.status === 200) {
            // Login successful
            const userData = response.data;
            const session = req.session;
            session.isloggedin = true;
            session.userid = userData.userID;

            // Redirect to index
            const redirectRoute = session.returnTo === '/login' ? '/index' : session.returnTo;
            res.redirect(req.baseUrl + redirectRoute);
        } else {
            // Invalid credentials
            res.render('login', { errorMessage: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

exports.index = async (req, res) => {
    const { isloggedin, userid } = req.session;
    const val = [userid];
    let errorMessage = null;
    let userinfo = {};

    if (isloggedin) {
        let dateLogged = req.query.dateLogged || new Date();

        // Imported dayjs to format date. This can probably be used in other sections where the date is fetched
        const formattedDate = dayjs(dateLogged).format("YYYY-MM-DD");

        const endpoint = `http://localhost:4001/emotions/${userid}?dateLogged=${formattedDate}`;

        try {
            // Make GET request to the API
            const response = await axios.get(endpoint);

            if (response.status === 200) {
                const emotions = response.data.emotions;
                const rows = response.data.rows;

                console.log(emotions.length);
                console.log(rows);

                // Assuming 'rows' is an array of emotions, adjust this part based on your API response structure

                const username = `${rows[0].forename} ${rows[0].surname}`;
                const userrole = rows[0].role;
                const session = req.session;
                session.isloggedin = true;
                session.name = username;
                session.role = userrole;
                userinfo = { name: username, role: userrole };

                if (emotions.length === 0) {
                    errorMessage = "No data to show.";
                    res.render('index', { errorMessage, emotions, loggedin: isloggedin, user: userinfo });
                }
                else {
                    res.render('index', {
                        emotions, loggedin: isloggedin, user: userinfo, errorMessage
                    });
                }
            }
        } catch (error) {
            console.error(`Error fetching emotions: ${error}`);
            errorMessage = "Error fetching emotions.";
            res.render('index', { errorMessage, loggedin: isloggedin, user: userinfo });
        }
    } else {
        const session = req.session;
        session.isloggedin = false;
        res.render('index', { loggedin: isloggedin });
    }
};

// CREATE GET
exports.getNewEmotion = (req, res) => {
    const { isloggedin } = req.session;
    if (isloggedin) {
        req.session.returnTo = req.originalUrl;
        res.render('addEmotion');
    } else {
        const session = req.session;
        session.isloggedin = false;
        session.returnTo = req.originalUrl;
        return res.redirect('/login');
    }
};

// CREATE POST
exports.newEmotion = async (req, res) => {

    const { userid } = req.session;

    var  dateLogged = req.body.dateLogged;
    const { enjoyment, sadness,
        anger, contempt, disgust, fear, surprise, triggers } = req.body;

        const parsedDate = dayjs(dateLogged);
        
        // Format the date as per your requirements
        dateLogged = parsedDate.format("YYYY-MM-DD HH:mm:ss")

    const vals = [userid, dateLogged, enjoyment, sadness,
        anger, contempt, disgust, fear, surprise, triggers];


    const endpoint = `http://localhost:4001/emotions/new`;

    try {
        await axios.post(endpoint, vals);

        const session = req.session;
        session.isloggedin = true;

        // Redirect to index
        const redirectRoute = session.returnTo === '/newEmotion' ? '/index' : session.returnTo;
        res.redirect(req.baseUrl + redirectRoute);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

// EDIT GET
exports.selectEmotion = async (req, res) => {
    const { isloggedin, userid } = req.session;
    const { id } = req.params;

    if (isloggedin) {
        const endpoint = `http://localhost:4001/emotion/${id}?userid=${userid}`;

        try {
            // Make GET request to the API
            const response = await axios.get(endpoint);

            // Check if the request was successful (status code 200)
            if (response.status === 200) {
                const details = response.data.rows;  // Assuming the API returns the details in a 'rows' property
                const session = req.session;
                session.isloggedin = true;

                res.render('editEmotion', { details, loggedin: isloggedin });
            } else {
                // Handle other status codes if needed
                res.status(response.status).send(response.statusText);
            }
        } catch (error) {
            console.error(`Error fetching emotion details: ${error}`);
            res.status(500).send('Internal Server Error');
        }
    } else {
        const session = req.session;
        session.isloggedin = false;
        return res.redirect('/login');
    }
};

// EDIT POST
exports.updateEmotion = async (req, res) => {
    const { isloggedin, userid } = req.session;
    const id = req.params.id;
    const { triggers } = req.body;

    console.log(triggers);
    if (isloggedin) {

        const endpoint = `http://localhost:4001/emotion/${id}?userid=${userid}`;
        try {
            // Make PUT request to the API
            const response = await axios.patch(endpoint, { triggers });

            // Check if the request was successful (status code 200)
            if (response.status === 200) {
                const session = req.session;
                session.isloggedin = true;

                const redirectRoute = session.returnTo === '/login' ? '/index' : session.returnTo;

                res.redirect(redirectRoute);
            } else {
                // Handle other status codes if needed
                res.status(response.status).send(response.statusText);
            }
        } catch (error) {
            console.error(`Error updating emotion details: ${error}`);
            res.status(500).send('Internal Server Error');
        }
    } else {
        const session = req.session;
        session.isloggedin = false;
        return res.redirect('/login');
    }
};


// DELETE
exports.deleteEmotion = async (req, res) => {
    const id = req.params.id;
    //const userID = req.body.userid;

    const endpoint = `http://localhost:4001/emotions/${id}`;

    try {
        await axios.delete(endpoint, { data: req.body }); // Use the 'data' property
        const redirectRoute = req.session.returnTo || '/index';
        res.redirect(redirectRoute);
    } catch (error) {
        console.error('Error deleting emotion:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

// GET contact US
exports.contact = (req, res) => {
    const { isloggedin } = req.session;
    res.render('contact', { loggedin: isloggedin });
};


// GET ABOUT US
exports.about = (req, res) => {
    const { isloggedin } = req.session;
    res.render('about', { loggedin: isloggedin });
};


exports.timeline = async (req, res) => {
    const session = req.session;
    const { isloggedin, userid } = req.session;
    var userinfo = {};
    let errorMessage = null;

    if (isloggedin) {

        const endpoint = `http://localhost:4001/timeline/${userid}`;

        try {
            // Make GET request to the API
            const response = await axios.get(endpoint);

            // Check if the request was successful (status code 200)
            if (response.status === 200) {

                const userRows = response.data.userRows;
                const rows = response.data.rows;

                const username = `${userRows[0].forename} ${userRows[0].surname}`;
                const userrole = userRows[0].role;
                session.isloggedin = true;
                session.name = username;
                session.role = userrole;
                userinfo = { id: userid, name: username, role: userrole };

                session.returnTo = req.originalUrl;
                res.render('timeline', {
                    emotions: rows, loggedin: isloggedin, user: userinfo, errorMessage
                });
            } else {
                userinfo = { id: userid, name: username, role: userrole };
                const errorMessage = "No data to show.";
                res.render('timeline', { errorMessage, emotions: rows, loggedin: isloggedin, user: userinfo });
            }
        } catch (error) {
            console.log(error);
            errorMessage = "Error fetching user information.";
            return res.redirect('/index');
        }
    } else {
        const session = req.session;
        session.isloggedin = false;
        session.returnTo = req.originalUrl;
        return res.redirect('/login');
    }
};

exports.userDetails = async (req, res) => {
    const { isloggedin, userid } = req.session;
    const session = req.session;

    let successMessage;

    if (req.query.success === 'true') {
        successMessage = "Details updated successfully!";
        errorMessage = null;
    } else if (req.query.success === 'false') {
        errorMessage = "Email address already in use";
        successMessage = null;
    } else {
        successMessage = null;
        errorMessage = null
    }

    if (isloggedin) {

        const endpoint = `http://localhost:4001/users/${userid}`;

        try {
            // Make GET request to the API
            const response = await axios.get(endpoint);

            // Check if the request was successful (status code 200)
            if (response.status === 200) {
                session.isloggedin = true;

                const user = response.data.result;

                console.log(user)

                // Pass the success message to the EJS template
                res.render('userDetails', {
                    user,
                    loggedin: isloggedin,
                    successMessage: successMessage,
                });
            } else {
                // Handle other status codes if needed
                res.status(response.status).send(response.statusText);
            }
        } catch (error) {
            console.error(`Error fetching emotion details: ${error}`);
            res.status(500).send('Internal Server Error');
        }
    } else {
        const session = req.session;
        session.isloggedin = false;
        session.returnTo = req.originalUrl;
        return res.redirect('/login');
    }
};

exports.updateUserDetails = async (req, res) => {
    const { isloggedin } = req.session;

    if (isloggedin) {
        const userid = req.session.userid;
        const { forename, surname, emailAddress, userPassword } = req.body;
        const vals = [userid, forename, surname, emailAddress, userPassword];

        console.log(vals);

        const endpoint = `http://localhost:4001/updateUser`;

        try {
            // Make PATCH request to the API
            const response = await axios.patch(endpoint, vals);

            if (response.status === 200) {
                const session = req.session;
                session.isloggedin = true;
                const user = response.data.result;

                console.log(user);

                return res.redirect('/userDetails?success=true');
            } else {
                // Handle other status codes if needed
                return res.status(response.status).send(response.statusText);
            }
        } catch (error) {
            console.log('304 received');
            return res.redirect('/userDetails?success=false');
        }
    } else {
        const session = req.session;
        session.isloggedin = false;
        session.returnTo = req.originalUrl;
        return res.redirect('/login');
    }
};

// DELETE USER ACCOUNT
exports.postDeleteAccount = async (req, res) => {
    const userid = req.session.userid;

    const endpoint = `http://localhost:4001/users/${userid}`;

    try {
        await axios.delete(endpoint);

        req.session.destroy(() => {
            res.redirect('/index');
        });
    } catch (error) {
        console.error('Error deleting emotion:', error.message);
        res.status(500).send('Internal Server Error');
    }
};