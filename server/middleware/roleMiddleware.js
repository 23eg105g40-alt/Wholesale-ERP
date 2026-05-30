const roleMiddleware = (...roles) => {

    return (req, res, next) => {

        // CHECK ROLE
        if (

            !roles.includes(req.user.role)

        ) {

            return res.status(403).json({

                message:
                    "Access Denied"

            });

        }

        next();

    };

};

export default roleMiddleware;