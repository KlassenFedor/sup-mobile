import moment from 'moment';
import { ServerDateFormat } from '../constants';

export const handleStylesToAdd = (styles?: any) => (typeof styles === 'object' ? styles : {});

export const convertStrToDate = (date: string) => moment(date, ServerDateFormat).toDate();
