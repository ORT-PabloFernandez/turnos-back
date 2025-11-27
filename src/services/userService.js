import { findAllUsers, findUserById, registerUser, findByCredentials, updateUser } from "../data/userData.js";

export const getUsers = async () => {
    return await findAllUsers();
}

export const getUserById = async (id) => {
    return await findUserById(id);
}

export const updateUserById = async (id, authUser, newUserData) => {
    const user = await findUserById(id);
    if (!user) {
        throw new Error("User no encontrado");
    }

    if (user._id.toString() != authUser) {
        throw new Error("Usuario no autorizado")
    }

    if (newUserData.avatar != "" && newUserData.avatar != null) {
        user.avatar = newUserData.avatar
    }
    if (newUserData.fechaNacimiento != "" && newUserData.fechaNacimiento != null) {
        user.fechaNacimiento = newUserData.fechaNacimiento
    }
    if (newUserData.nombre != "" && newUserData.nombre != null) {
        user.nombre = newUserData.nombre
    }
    if (newUserData.apellido != "" && newUserData.apellido != null) {
        user.apellido = newUserData.apellido
    }
    const updatedData = {
        ...user,
        fechaActualizacion: new Date()
    };
    
    return await updateUser(id, updatedData);
}

export const registerUserService = async ({ username, email, password }) => {
    try {
        return await registerUser({ username, email, password });
    } catch (error) {
        if (error.message === "El email ya está registrado") {
            // Re-lanzar para que el controller lo maneje
            throw error;
        }
        if (error.message.includes("E11000")) {
            throw new Error("Username ya registrado")
        }
        throw new Error("Error al registrar el usuario");
    }
}

export const loginUserService = async ({ email, password }) => {
    const user = await findByCredentials(email, password);
    if (!user) {
        throw new Error("Credenciales inválidas");
    }
    // No devolver password
    const { password: _pw, ...userWithoutPassword } = user;
    return userWithoutPassword;
}