import e from "express";
import client from "../../client";
import {NEW_MESSAGE} from "../../constant";
import pubsub from "../../pubsub";
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
                const message = await client.message.create({
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
                /*
                메세지를 보면 pubsub 가 트리거를 보냄  (같은 트리거 이름으로)
                두번째 매개변수로는 subScribe의 이름과 반환값을 적어줌.
                */
                pubsub.publish(NEW_MESSAGE, {roomUpdates: {...message}});
                return {
                    ok: true,
                };
            }
        ),
    },
};
