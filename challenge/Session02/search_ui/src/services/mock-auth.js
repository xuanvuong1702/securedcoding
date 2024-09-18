const mockLoginResData = {
    status: 200,
    email: "test-user@gmail.com",
    token: "!@#$%",
};

export const mockLoginAPI = () =>
    new Promise((resolve, reject) => {
        if (!mockLoginResData) {
            return setTimeout(() => reject(new Error("Users not found")), 2500);
        }

        return setTimeout(() => resolve(mockLoginResData), 250);
    });

export const mockFetchUserByTokenAPI = () =>
    new Promise((resolve, reject) => {
        if (!mockLoginResData) {
            return setTimeout(() => reject(new Error("Users not found")), 2500);
        }

        return setTimeout(() => resolve(mockLoginResData), 250);
    });
