/**
 *
 * @param {string} name
 * @param {object[]} otherUsers
 */
export const LookUserByName = (name, otherUsers) => {
  const result = otherUsers.filter((item) => {
    if (item.Name === name) return item;
  });
  if (result.length > 0) return result[0];
  return null;
};

/**
 *
 * @param {Date} date1
 * @param {Date} date2
 *
 * possible outcomes:
 * - 0: if both dates are the same or have the same day
 * - 1: if are both differents dates with a day of difference
 * - 2: if are both differents dates with more than a day of difference
 *
 * @returns a number from possible outcomes
 *
 */
export const compareDates = (date1, date2) => {
  if (date1.getDate() === date2.getDate()) return 0;
  //knowing if was yesterday (86'400'000 means a day in milliseconds)
  if (date1.getMilliseconds() - date2.getMilliseconds() === 86400000) return 1;
  return 2;
};

/**
 *
 * @param {date} now
 * @param {date} messageDate
 */
export const generateTextDate = (now, messageDate) => {
  let date = "";
  date += now.getHours() + " : " + now.getMinutes();
  //knowing if was yesterday (86'400'000 means a day in milliseconds)
  if (now.getMilliseconds() - messageDate.getMilliseconds() === 86400000)
    date += " Yesterday";
  else {
    if (now.getDate() !== messageDate.getDate())
      date += "/" + messageDate.getDate();
    if (now.getMonth() !== messageDate.getMonth())
      date += "/" + messageDate.getMonth();
    if (now.getFullYear() !== messageDate.getFullYear())
      date += "/" + messageDate.getFullYear();
  }
};

/**
 * 
 * @param {string} lang 
 */
export const changeLanguage = (lang) => {

}