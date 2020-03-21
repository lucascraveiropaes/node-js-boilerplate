import { sha512 }        from "js-sha512";
import * as GeneralUtils from "utils/General";
import * as UserUtils    from "utils/User";
import User              from "dao/User";

const errorMessage = part => `Não foi possível ${part} no momento. Entre em contato com o suporte para corrigir esse erro.`;
const errorResponse = {
    status: false,
    message: "Erro no servidor"
};
let response = errorResponse;

class UserController {
    async login(req, res) {
        try {
            const { login, password } = req.body;

            if (UserUtils.validateUserLogin(req.body) === false) {
                response.message = "Informe os dados corretamente";
                return res.status(400).send(response);
            }

            const user = await User.findOne({
                login, password
            });

            if (user !== null) {
                const token = await UserUtils.updateToken(user._id);

                if (token) {
                    response.message = `Seja bem vindo, ${user.name}`;
                    response.user = user;
                    response.status = true;
                    response.user.token = token;
                    delete response.user.password;
                    return res.status(200).send(response);
                } else {
                    delete response.user;
                    response.status = false;
                    response.message = "Não foi possível liberar o seu acesso no momento";
                    return res.status(500).send(response);
                }
            }

            response.status = false;
            response.message = "Dados informados incorretos";
            delete response.user;
            return res.status(200).send(response);
        } catch (e) {
            console.log(e);
            return res.status(500).send(errorResponse);
        }
    }

    async newUser(req, res) {
        try {
            const { name, login } = req.body;

            if (!name || !login) {
                response.message = "Informe os dados corretamente";
                return res.status(400).send(response);
            }

            const user = await User.insert({
                name,
                login,
                password: sha512("123456").toUpperCase(),
                token: null
            });

            if (!user) {
                response.message = errorMessage("adicionar um novo usuário");
                return res.status(500).send(response);
            }

            let userData = user.ops;
            delete userData.password;

            return res.status(200).send({
                status: true,
                data: userData
            });
        } catch (e) {
            console.log(e);
            return res.status(500).send(errorResponse);
        }
    }

    async listUsers(req, res) {
        try {
            const users = await User.findBy();

            if (!users) {
                response.message = errorMessage("buscar a lista de usuários");
                return res.status(500).send(response);
            }

            return res.status(200).send({
                status: true,
                data: users.map(u => ({
                    _id: u._id,
                    name: u.name,
                    login: u.login
                }))
            });
        } catch (e) {
            console.log(e);
            return res.status(500).send(errorResponse);
        }
    }

    async updateUser(req, res) {
        try {
            const { user } = req.midd;
            const data = req.body;

            const status = await User.updateByID(user._id, data);

            if (!status) {
                response.message = errorMessage("atualizar os dados");
                return res.status(500).send(response);
            }

            return res.status(200).send({
                status: true,
                message: "Dados atualizados com sucesso!"
            });
        } catch (e) {
            console.log(e);
            return res.status(500).send(errorResponse);
        }
    }

    async deleteUser(req, res) {
        try {
            const { userID } = req.params;

            const status = await User.deleteByID(userID);

            if (!status) {
                response.message = errorMessage("deletar o usuário");
                return res.status(500).send(response);
            }

            return res.status(200).send({
                status: true,
                message: "Usuário deletado com sucesso!"
            });
        } catch (e) {
            console.log(e);
            return res.status(500).send(errorResponse);
        }
    }
}

export default new UserController();
