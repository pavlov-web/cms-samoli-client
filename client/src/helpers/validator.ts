export const validator = {
  email: (value: string): boolean => {
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return !!value.match(mailFormat);
  },

  max: (value: number, limit: number): boolean => {
    return formatValue(value) <= +limit;
  },

  min: (value: number, limit: number): boolean => {
    return formatValue(value) >= +limit;
  },

  minmax: (value: number | string, from: number, to: number): boolean => {
    return formatValue(value) >= +from && formatValue(value) <= +to;
  },

  required: (value: number | string): boolean => {
    return !!value;
  },
};

const formatValue = (value: string | number) => {
  return Number(value) ? +value : value.toString().length;
};
