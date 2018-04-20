import { OSC_ACTION } from '../middlewares/osc';

export function loadAbletonSetup() {
  return {
    [OSC_ACTION]: {
      type: 'setup',
    },
  };
};
