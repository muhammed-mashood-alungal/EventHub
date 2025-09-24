import { createSystem, defaultConfig } from '@chakra-ui/react';

export const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        primary: { value: '#ff6347' }, 
      },
    },
  },
});
