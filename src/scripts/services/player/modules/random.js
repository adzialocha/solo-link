export default {
  parameters: {
    chance: {
      default: 0.5,
      max: 1,
      min: 0,
      step: 0.1,
    },
  },
  value: options => {
    return Math.random() < options.chance;
  },
};
