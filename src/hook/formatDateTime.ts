import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone'; // 引入 timezone 插件
import utc from 'dayjs/plugin/utc'; // 引入 utc 插件
// 初始化插件
dayjs.extend(utc);
dayjs.extend(timezone);
const formatDateTime = (date: Date | null) => {
  if (!date) return '无';
  return dayjs(date).tz('Asia/Shanghai').format('YYYY/MM/DD HH:mm');
};
export { formatDateTime };
