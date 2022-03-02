import client from "../client";
import bcrypt from "bcrypt";
export default {
    Mutation: {
        createAccount: async (
            _,
            {firstName, lastName, username, email, password}
        ) => {
            try {
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [{username}, {email}],
                    },
                });
                const hashedPassword = await bcrypt.hash(password, 10);
                if (existingUser !== null) {
                    throw new Error("This username/password is already taken.");
                }

                return client.user.create({
                    data: {
                        firstName,
                        lastName,
                        username,
                        email,
                        password: hashedPassword,
                    },
                });
            } catch (e) {
                return e;
            }
        },
    },
};
