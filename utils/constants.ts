import { BreathingData, BreathingType, UserActionsMap } from './types';

export const MODES: Readonly<{ [mode in BreathingType]: BreathingData }> =
  Object.freeze({
    '4-7-8': {
      name: '4-7-8 Breathing',
      description:
        'Inhale for 4 seconds, hold the breath for 7 seconds and exhale for 8 seconds. This technique helps reduce stress and promote relaxation.',
      actionsMap: { inhale: 4, hold_inhale: 7, exhale: 8 }
    },
    box: {
      name: 'Box Breathing',
      description:
        'Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds and hold again for 4 seconds. It enhances focus and effectively calms the busy mind.',
      actionsMap: { inhale: 4, hold_inhale: 4, exhale: 4, hold_exhale: 4 }
    },
    diaphragm: {
      name: 'Diaphragmatic Breathing',
      description:
        'Inhale deeply, expanding the diaphragm, for 4 seconds and exhale for 6 seconds. This exercise improves lung efficiency and reduces stress.',
      actionsMap: { inhale: 4, exhale: 6 }
    },
    'pursed-lip': {
      name: 'Pursed Lip Breathing',
      description:
        'Inhale through the nose for 2 seconds, exhale slowly through pursed lips for 4 seconds. It helps slow down breathing and promotes relaxation.',
      actionsMap: { inhale: 2, exhale: 4 }
    },
    resonant: {
      name: 'Resonant Breathing',
      description:
        'Breathe in and out evenly, usually around 6 breaths per minute. This method balances the nervous system and improves emotional well-being.',
      actionsMap: { inhale: 5, exhale: 5 }
    }
  });

export const BreathingDictionary: Readonly<UserActionsMap> = Object.freeze({
  inhale: 'Inhale',
  hold_inhale: 'Hold',
  exhale: 'Exhale',
  hold_exhale: 'Hold'
});

/** Max width in pixels */
export const MAX_WIDTH_PROGRESS_BAR = 80;
/** 60 FPS */
export const FRAME_INTERVAL = 16.6;
