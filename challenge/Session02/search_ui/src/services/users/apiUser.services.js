import {
    sendPostRequest,
    sendGetRequest,
    sendPatchRequest,
    sendDeleteRequest,
} from "services";

// Signup
export const createClientUserAdminAxios = async (data) => {
    return sendPostRequest("/users/signup", { ...data });
};

export const updateClientUserAdminByIdAxios = async (data) => {
    return sendPatchRequest(`/users/${data.id}`, data);
};

// User Address
export const deleteAddressById = async (id) => {
    return sendDeleteRequest(`/address/${id}`);
};
