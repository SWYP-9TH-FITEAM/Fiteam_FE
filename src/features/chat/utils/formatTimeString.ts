/*
 * 시간 형식을 변환하는 유틸 함수
 * @param timestamp - ISO 8601 형식의 시간 문자열 "2025-05-01T14:15:00"
 * @returns 오전/오후 HH:MM 형식의 시간 문자열 "오후 3:00"
 */

export const formatTimeString = (timestamp: string) => {
  const timeMatch = timestamp.match(/T(\d{2}):(\d{2}):/);
  if (!timeMatch) return '';

  const hours = parseInt(timeMatch[1], 10);
  const minutes = timeMatch[2];

  const ampm = hours >= 12 ? '오후' : '오전';
  const formattedHours = hours % 12 || 12;

  return `${ampm} ${formattedHours}:${minutes}`;
};
