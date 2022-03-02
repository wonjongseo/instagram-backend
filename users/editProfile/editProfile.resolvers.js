import fs from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import {protectResolver} from "../users.utils";

export default {
    Mutation: {
        editProfile: protectResolver(
            async (
                _,
                {
                    firstName,
                    lastName,
                    username,
                    email,
                    password: newPassword,
                    bio,
                    avatar,
                },
                {loggedInUser}
            ) => {
                const {filename, createReadStream} = await avatar;
                const readStream = createReadStream();

                const writeStream = fs.createWriteStream(
                    process.cwd() + "/uploads/" + filename
                );
                readStream.pipe(writeStream);
                let hashedPassword = null;

                if (newPassword) {
                    hashedPassword = await bcrypt.hash(newPassword, 10);
                }
                const updatedUser = await client.user.update({
                    where: {id: loggedInUser.id},
                    data: {
                        firstName,
                        lastName,
                        username,
                        email,
                        bio,
                        ...(hashedPassword && {password: hashedPassword}),
                    },
                });

                if (updatedUser.id) {
                    return {
                        ok: true,
                    };
                } else {
                    return {
                        ok: false,
                        error: "Could not update profile",
                    };
                }
            }
        ),
    },
};
