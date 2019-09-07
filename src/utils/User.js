import { User } from "models";

export function validateUserLogin(data) {
    return !(
        typeof data.login !== "string" &&
        data.login.length === 0 &&
        typeof data.password !== "string" &&
        data.password.length === 0
    );
}

export async function updateTokenAndKey(clientKey, token, userId) {
    try {
        const updateStatus = await User.update({
            clientKey,
            token,
        }, {
            where: {
                id: userId
            }
        });

        return !!updateStatus;
    } catch (e) {
        console.log(e);
        return false;
    }
}
