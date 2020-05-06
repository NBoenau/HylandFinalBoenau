module.exports = {
    // Load the form to add a player - GET
    addPlayerPage: function (request, response) {
        // Load the page
        response.render('edit-player', {add: true});
    },

    addPlayer: function(request, response) {
        let user_name = request.body.user_name;
        let position = request.body.position;
        let champion = request.body.champion;

        let query = `INSERT INTO players (user_name, position, champion)
        VALUES ('${user_name}', '${position}', '${champion}');`;

    db.query(query, function (error, result) {
        if (error) {
            // Send server error
            return response.status(500).send(error);
        }

        // New player added successfully, reload homepage
        response.redirect('/');
    });
    },
    // Load the form to edit a player - GET
editPlayerPage: function (request, response) {
    let playerId = request.params.id;
    let query = `SELECT * FROM players WHERE id = ${playerId};`;

    db.query(query, function (error, result) {
        if (error) {
            return response.status(500).send(error);
        }

        console.log(result[0]);

        response.render('edit-player', {
            add: false,
            player: result[0]
        });
    });
    },
    // Update a player in the database - POST
editPlayer: function (request, response) {
    // Get values from the request
    let playerId = request.params.id;
    let user_name = request.body.user_name;
    let position = request.body.position;
    let champion = request.body.champion;

    // Query to update the existing player
    let query = `UPDATE players
        SET user_name = '${user_name}', position = '${position}', champion = '${champion}'
        WHERE id = ${playerId};`;

    // Execute the query
    db.query(query, function (error, result) {
        if (error) {
            // Send server error
            return response.status(500).send(error);
        }

        // Update successful, return to homepage
        response.redirect('/');
    });
},
    // Delete a player from the database - GET
deletePlayer: function (request, response) {
    // Get player ID from request
    let playerId = request.params.id;

    // Query to delete the given player
    let query = `DELETE FROM players WHERE id = ${playerId};`;

    db.query(query, function (error, result) {
        if (error) {
            // Send server error
            return response.status(500).send(error);
        }

        // Delete successful, return to homepage
        response.redirect('/');
    });
}
}

