export function generateProjectionData(initial, rate, months, type = "growth") {
  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const today = new Date();
  const data = [];
  for (let i = 0; i < months; i++) {
    const monthIndex = (today.getMonth() + i) % 12;
    const value =
      type === "decay"
        ? initial * Math.pow(1 - rate, i)
        : initial * Math.pow(rate, i);
    data.push({ month: monthNames[monthIndex], value: Math.round(value) });
  }
  return data;
}
