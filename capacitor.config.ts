import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.diegogglez.powerlog',
  appName: 'power-log',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
