import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
const getDateStr = (d: Date) => dayjs(d).format('YYYY-MM-DD');

const getYear = (d: Date): number => dayjs(d).year();

export { dayjs, getDateStr, getYear };
