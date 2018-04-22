export default {
  parameters: {
    chance: {
      default: 0.5,
      label: 'Chance (in %)',
      max: 1,
      min: 0,
      step: 0.01,
    },
  },
  value: options => {
    return Math.random() < options.chance;
  },
};
