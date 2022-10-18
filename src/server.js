const express = require('express')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// const { UsersRepository } = require('./repositories');
// const { registerRoutes } = require('./router');

// const usersRepository = new UsersRepository();

const spawnServer = () => {
    const app = express()
    const port = 8080

    app.use(bodyParser.json());

    app.use(async function (req, res, next) {
        try {
            const { path } = req;
            const noAuthRequiredRoutes = ['/auth/login'];
            const accessToken = req.headers['x-access-token'];

            if (noAuthRequiredRoutes.includes(path)) {
                next();
                return;
            }

            // Realizar validacion JWT
            try {
                const result = jwt.verify(accessToken, process.env.TOKEN_SECRET);
                if (!result)
                    throw new Error('Could not verify JWT.');

                // const { user_id } = jwt.decode(accessToken);
                // const user = await usersRepository.findOneById(user_id);
                // if (!user || user.id <= 0) {
                //     throw new Error('Could not get user.');
                // }

                // Mapear usuario en el request
                // req.user = user;
            } catch (e) {
                res.json({ message: 'Unauthenticated' }, 403);
                return;
            }

            next();
        } catch (e) {
            console.log(e);
            res.json({ message: 'Internal server error.' }, 500);
        }
    });

    app.use((err, req, res, next) => {
        res.json({ message: 'Internal server error.' }, 500);
    })

    registerRoutes(app);

    app.listen(port, () => {
        console.log(`RESTful server running at http://127.0.0.1:${port}`)
    })
}

module.exports = { spawnServer };