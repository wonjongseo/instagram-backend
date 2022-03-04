import client from "../client";
import {protectResolver} from "../users/users.utils";

export default {
    Comment: {
        isMine: ({userId}, _, {loggedInUser}) => {
            if (!loggedInUser) {
                return false;
            }
            return userId === loggedInUser.id;
        },
    },
};
