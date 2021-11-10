import { dayjs } from '../dayjs/dayjs';

const getFromNowTime = (date: Date) => dayjs(date).fromNow();

export { getFromNowTime };
