
const LocalStrategy = require('passport-local').Strategy
const initialize = (passport, getUserByEmail, getUserById) => {
    console.log("arrived here ",getUserByEmail)
    const authenticateUser = (email, password, done) => {
     console.log("arrived here ",email,password)
        const user = getUserByEmail(email);
        if (user == null) {
            console.log("no user");
            return done(null, false, { message: "no user found" });
        }
        try {
            console.log("on try");
            if (password == user.password)return done(null, user)
            else return done(null, false, { message: "Password incorrect" });

        }
        catch (e) {
            return done(e);
        }

    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        console.log("no des");
        return done(null, getUserById(id))
    })
}
module.exports = initialize;