const dateFormatter = (milliseconds) => {
  const date = new Date(milliseconds).toLocaleString();

  const dateArr = date.split(",");

  const timeArr = dateArr[1].trim().split(" ");

  const hourMinArr = timeArr[0].split(":");

  const amPm = timeArr[1].toLowerCase();

  //sets date structure mm/dd/yyyy hh:mm am/pm
  const postedDate = `${dateArr[0]}, ${hourMinArr[0]}:${hourMinArr[1]} ${amPm}`;

  return postedDate;
};

module.exports = dateFormatter;