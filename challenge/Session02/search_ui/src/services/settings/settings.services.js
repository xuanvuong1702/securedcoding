import {
    sendDeleteRequest,
    sendGetRequest,
    sendPatchRequest,
    sendPostRequest,
} from "services";
// Profile
export const getUserProfile = async () => {
    return sendGetRequest(`/users/profile`);
};
export const updateUserProfileById = async (data) => {
    return sendPatchRequest(`/users/profile`, { ...data });
};
// Card Payment
export const createUserCardPayment = async (data) => {
    return sendPostRequest(`/users/create-payment-methods`, { ...data });
};
export const getUserCardList = async () => {
    return sendGetRequest(`/users/get-payment-methods`);
};
export const deleteUserCardById = (id) => {
    return sendDeleteRequest(`/users/payment-method-detail/${id}`);
};
// Address
export const getUserAddress = async () => {
    return sendGetRequest(`/users/get-all-address`);
};
export const getUserAddressById = async (id) => {
    return sendGetRequest(`/users/get-address-detail/${id}`);
};
export const createUserAddress = async (data) => {
    return sendPostRequest(`/users/create-address`, { ...data });
};
export const updateUserAddressById = async (id, data) => {
    return sendPatchRequest(`/users/address/${id}`, { ...data });
};
export const deleteUserAddressById = (id) => {
    return sendDeleteRequest(`/users/address/${id}`);
};
// Change Password
export const changeUserPassword = async (data) => {
    return sendPatchRequest(`/users/change-password-by-id`, { ...data });
};
