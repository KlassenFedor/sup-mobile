export const ANDROID_API_URL = 'http://10.0.2.2:8000'
export const WEB_API_URL = 'http://127.0.0.1:8000'
export const API_URL = 'http://romanskm.beget.tech/api'

export const formatString = (template: string, values: Record<string, string>): string => {
    return template.replace(/\{(\w+)\}/g, (_, key) => values[key] || `{${key}}`);
};

export enum requests {
    LOGIN = 'login',
    LOGOUT = 'logout',
    PROFILE = 'profile',
    MY_ABSENCES = 'skips',
    GET_ABSENCE = 'get_skip/{id}',
    CREATE_ABSENCE = 'skips',
    EXTEND_ABSENCE = 'skips/{skip}/extensions',
    ABSENCES_ON_CHECKING = 'skips_on_checking',
}