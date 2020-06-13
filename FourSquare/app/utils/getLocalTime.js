import moment from 'moment';

export const getLocalTime = (date) => {
  return moment.utc(date).local();
};

export const getCurrentLocalTime = () => {
  return moment(Date.now());
};

export const getDayStart = (date) => {
  return date + 'T00:00:00';
};

export const getDayEnd = (date) => {
  return date + 'T23:59:59';
};

export const isSecondDay = (date) => {
  return date.toISOString().slice(0, 10);
};

export const formateDate = (date) => {
  return moment(date).get().format('DD MMM YYYY');
};

export const formatToISOString = (date) => {
  return date.format().slice(0, -6);
};
