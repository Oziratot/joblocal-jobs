export default function transformParamsToApiFormat(params) {
     return Object.entries(params).reduce((acc, [key, value]) => {
        if (typeof value === "object") {
            Object.entries(value).forEach(([k, v]) => acc[`${key}.${k}`] =  v)
        }

        return acc;
    }, {})
}
