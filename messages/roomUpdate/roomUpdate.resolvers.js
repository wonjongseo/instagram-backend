import {withFilter} from "apollo-server-express";
import client from "../../client";
import pubsub from "../../pubsub";
const NEW_MESSAGE = "NEW_MESSAGE";

export default {
    Subscription: {
        roomUpdates: {
            subscribe: async (root, args, context, info) => {
                // 리스닝 하기 전,
                const room = await client.room.findFirst({
                    where: {
                        id: args.id,
                        users: {
                            some: {
                                id: context.loggedInUser.id,
                            },
                        },
                    },
                    select: {
                        id: true,
                    },
                });
                if (!room) {
                    throw new Error("You shall not see this.");
                }
                //subscribe 함수는 pubsub의 인스턴스 메서드인   asyncIterator의 리턴값을 반환함.
                // asyncIterator 의 매개변수는 trigger 이름이다.
                //  응답 받을 때 스리거 이름으로 받음.
                // subscribe: () => pubsub.asyncIterator(NEW_MESSAGE),
                return withFilter(
                    () => pubsub.asyncIterator(NEW_MESSAGE),

                    // 두번째는 publish 할때만 작동함. 즉 리스닝 한 후
                    async ({roomUpdates}, {id}, {loggedInUser}) => {
                        if (roomUpdates.roomId === id) {
                            const room = await client.room.findFirst({
                                where: {
                                    id,
                                    users: {
                                        some: {
                                            id: loggedInUser.id,
                                        },
                                    },
                                },
                                select: {
                                    id: true,
                                },
                            });
                            if (!room) {
                                return false;
                            }
                            return true;
                        }
                    }
                )(root, args, context, info);
            },
        },
    },
};
