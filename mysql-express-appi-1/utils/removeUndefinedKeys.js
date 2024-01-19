const removeUndefinedKeys = (obj) => {
    try {
        Object.keys(obj).forEach((key) => {
            if (obj[key] === undefined || obj[key] === '') {
                delete obj[key];
            }
        });
        return obj;
    } catch (e) {
        console.log(e)
        throw new Error(e);
    };
};
module.exports = removeUndefinedKeys;