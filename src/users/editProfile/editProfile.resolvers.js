import fs from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import {protectResolver} from "../users.utils";
import {uploadToS3} from "../../shared/shared.utils";

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
                let avatarUrl = null;
                if (avatar) {
                    // const {filename, createReadStream} = await avatar;
                    // const newFilename = `${
                    //     loggedInUser.id
                    // }-${Date.now()}-${filename}`;
                    // const readStream = createReadStream();
                    // const writeStream = fs.createWriteStream(
                    //     process.cwd() + "/uploads/" + newFilename
                    // );
                    // readStream.pipe(writeStream);
                    // avatarUrl = `http://localhost:4000/static/${newFilename}`;

                    avatarUrl = await uploadToS3(
                        avatar,
                        loggedInUser.id,
                        "avatars"
                    );
                }
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
                        ...(avatarUrl && {avatar: avatarUrl}),
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
