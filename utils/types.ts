export type BreathingType =
  | '4-7-8'
  | 'box'
  | 'diaphragm'
  | 'pursed-lip'
  | 'resonant';
export type Actions = 'inhale' | 'hold_inhale' | 'exhale' | 'hold_exhale';
export type ActionsMap = { [action in Actions]?: number };
export type BreathingData = {
  name: string;
  description: string;
  actionsMap: ActionsMap;
};

export type UserActions = 'Inhale' | 'Hold' | 'Exhale';
export type UserActionsMap = { [action in Actions]?: UserActions };

export type Transition = { duration: number; isFirstTime: boolean };
