import modules from './modules';
import triggers from './triggers';

export function getTriggerNames() {
  return Object.keys(triggers);
}

export function getModuleNames() {
  return Object.keys(modules);
}
