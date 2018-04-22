export default {
  parameters: {
    frequency: {
      default: 1000,
      max: 100000,
      min: 1,
      step: 1,
    },
  },
  value: (runtime, options) => {
    return Math.random() < options.frequency;
  },
};
