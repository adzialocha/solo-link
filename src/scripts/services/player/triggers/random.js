export default {
  parameters: {
    frequency: {
      default: 1000,
      max: Number.MAX_SAFE_INTEGER,
      min: 1,
      step: 1,
    },
  },
  value: (runtime, options) => {
    return Math.random() * options.frequency;
  },
};
