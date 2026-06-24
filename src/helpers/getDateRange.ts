export function getDateRange(date: string | Date) {
  // 1. normalize input to a Date object
  const d = new Date(date);

  // 2. create a new Date instance (copy) to avoid mutating the original
  const start = new Date(d);
  const end = new Date(d);

  // 3. set starting and ending point
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

export function getTodayRange() {
  const now = new Date();

  const start = new Date(now);
  const end = new Date(now);

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}
