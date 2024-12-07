const getEnvVar = (name: string, required: boolean = false): string => {
  const value = import.meta.env[name];
  if (!value && required) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value || '';
};

export const config = {
  api: {
    baseUrl: getEnvVar('VITE_API_BASE_URL', true),
  },
  glpi: {
    apiUrl: getEnvVar('VITE_GLPI_API_URL', true),
    apiToken: getEnvVar('VITE_GLPI_API_TOKEN', true),
  },
  whatsapp: {
    apiUrl: getEnvVar('VITE_WHATSAPP_API_URL', true),
    apiToken: getEnvVar('VITE_WHATSAPP_API_TOKEN', true),
  },
  openai: {
    apiKey: getEnvVar('VITE_OPENAI_API_KEY', true),
  },
  typebot: {
    apiUrl: getEnvVar('VITE_TYPEBOT_API_URL', true),
    apiToken: getEnvVar('VITE_TYPEBOT_API_TOKEN', true),
  },
} as const;

export type Config = typeof config;