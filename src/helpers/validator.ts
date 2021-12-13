export const validator = {
  email: (value: string): boolean => {
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return !!value.match(mailFormat);
  },

  max: (value: string, limit: number): boolean => {
    return value.length <= +limit;
  },

  min: (value: string, limit: number): boolean => {
    return value.length >= +limit;
  },

  minmax: (value: string, from: number, to: number): boolean => {
    return value.length >= +from && value.length <= +to;
  },

  required: (value: number | string): boolean => {
    return !!value;
  },
};

const formatValue = (value: string | number) => {
  return Number(value) ? +value : value.toString().length;
};
