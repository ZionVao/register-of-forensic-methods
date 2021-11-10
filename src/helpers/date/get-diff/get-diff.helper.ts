import { dayjs } from '../dayjs/dayjs';

const getDiff = (a: Date, b: Date) => dayjs(a).diff(b);

export { getDiff };
