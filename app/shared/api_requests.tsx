export const ANDROID_API_URL = 'http://10.0.2.2:8000'
export const WEB_API_URL = 'http://127.0.0.1:8000'
export const API_URL = 'http://romanskm.beget.tech'

export const formatString = (template: string, values: Record<string, string>): string => {
    return template.replace(/\{(\w+)\}/g, (_, key) => values[key] || `{${key}}`);
};

export enum requests {
    LOGIN = 'api/login',
    LOGOUT = 'api/logout',
    PROFILE = 'api/profile',
    MY_ABSENCES = 'api/skips/my',
    GET_ABSENCE = 'api/skips/{id}',
    CREATE_ABSENCE = 'api/skips',
    EXTEND_ABSENCE = 'api/skips/{skip}/extend',
    ABSENCES_ON_CHECKING = 'api/skips/my-filtered',
    DOCUMENTS = 'storage/'
}