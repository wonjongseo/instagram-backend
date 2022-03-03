import e from "express";
import client from "../../client";
import {protectResolver} from "../../users/users.utils";

export default {
    Mutation: {
        sendMessage: protectResolver(
            async (_, {payload, roomId, userId}, {loggedInUser}) => {
                let room = null;
                if (userId) {
                    const user = await client.user.findUnique({
                        where: {id: userId},
                        select: {id: true},
                    });

                    if (!user) {
                        return {
                            ok: false,
                            error: "This user does not exist.",
                        };
                    }
                    const hasRoom = await client.room.findMany({
                        where: {
                            AND: [
                                {
                                    users: {
                                        some: {
                                            id: userId,
                                        },
                                    },
                                },
                                {
                                    users: {
                                        some: {id: loggedInUser.id},
                                    },
                                },
                            ],
                        },
                    });

                    if (hasRoom.length > 0) {
                        room = hasRoom[0];
                    } else {
                        room = await client.room.create({
                            data: {
                                users: {
                                    connect: [
                                        {id: userId},
                                        {id: loggedInUser.id},
                                    ],
                                },
                            },
                        });
                    }
                } else if (roomId) {
                    room = await client.room.findUnique({
                        where: {id: roomId},
                        select: {id: true},
                    });

                    if (!room) {
                        return {
                            ok: false,
                            error: "This room does not exist.",
                        };
                    }
                }
                await client.message.create({
                    data: {
                        payload,
                        user: {
                            connect: {
                                id: loggedInUser.id,
                            },
                        },
                        room: {
                            connect: {
                                id: room.id,
                            },
                        },
                    },
                });
                return {
                    ok: true,
                };
            }
        ),
    },
};
