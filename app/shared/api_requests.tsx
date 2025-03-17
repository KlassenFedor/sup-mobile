export const ANDROID_API_URL = 'http://10.0.2.2:8000'
export const WEB_API_URL = 'http://127.0.0.1:8000'
export const API_URL = 'http://10.0.2.2:8000'

export enum requests {
    LOGIN = 'login',
    LOGOUT = 'logout',
    PROFILE = 'profile',
    MY_ABSENCES = 'skips',
    GET_ABSENCE = 'get_absence',
    CREATE_ABSENCE = 'create_absence',
    UPDATE_ABSENCE = 'update_absence',
    ABSENCES_ON_CHECKING = 'absences_on_checking',
}