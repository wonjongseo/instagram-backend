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

                if (existingUser) {
                    throw new Error("This username/password is already taken.");
                }
                // const hashedPassword = await bcrypt.hash(password, 10);
                const user = await client.user.create({
                    data: {
                        firstName,
                        lastName,
                        username,
                        email,
                        password: await bcrypt.hash(password, 10),
                    },
                });
                return {
                    ok: true,
                    user,
                };
            } catch (e) {
                return e;
            }
        },
    },
};
