export default function transformParamsToApiFormat(params) {
     return Object.entries(params).reduce((acc, [key, value]) => {
        if (typeof value === "object") {
            Object.entries(value).forEach(([k, v]) => {
                if (v || v.length > 0) {
                    acc[`${key}.${k}`] = v
                }
            })
        } else {
            acc[key] = value;
        }

        return acc;
    }, {})
}
