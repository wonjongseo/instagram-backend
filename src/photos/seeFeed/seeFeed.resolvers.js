import client from "../../client";
import {protectResolver} from "../../users/users.utils";

export default {
    Query: {
        seeFeed: (_, __, {loggedInUser}) => client.photo.findMany(),
    },
};

/*
{
                where: {
                    
                    // OR: [
                    //     {
                    //         user: {
                    //             followers: {
                    //                 some: {
                    //                     id: loggedInUser.id,
                    //                 },
                    //             },
                    //         },
                    //     },
                    //     {
                    //         userId: loggedInUser.id,
                    //     },
                    // ],
                },
                orderBy: {
                    createAt: "desc",
                },
            }
*/
