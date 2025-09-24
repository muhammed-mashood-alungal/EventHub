export const generateSlug = (title: string) => {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  return slug;
};
export const getEventStatus = (startTime: Date, endTime: Date) => {
  const currentTime = new Date();

  if (startTime > currentTime) {
    return "upcoming";
  } else if (endTime < currentTime) {
    return "past";
  } else {
    return "ongoing";
  }
};
