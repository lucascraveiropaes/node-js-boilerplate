import * as GeneralUtils from "utils/General";
import User              from "dao/User";

export function validateUserLogin(data) {
    return !(
        typeof data.login !== "string" &&
        data.login.length === 0 &&
        typeof data.password !== "string" &&
        data.password.length === 0
    );
}

export async function updateToken(id, token = GeneralUtils.generateToken()) {
    try {
        const updateStatus = await User.updateByID(id, { token });

        if (!!updateStatus)
            return token;

        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}
