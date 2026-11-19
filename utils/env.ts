import dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
  urls: {
    sauceDemo: process.env.SAUCEDEMO_URL || 'https://www.saucedemo.com',
    automationExercise:
      process.env.AUTOMATION_EXERCISE_URL || 'https://automationexercise.com',
    demoQa: process.env.DEMOQA_URL || 'https://demoqa.com'
  },
  credentials: {
    sauceDemo: {
      standardUser: process.env.SAUCEDEMO_USERNAME || 'standard_user',
      password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce',
      lockedUser: process.env.SAUCEDEMO_LOCKED_USER || 'locked_out_user'
    }
  },
  execution: {
    headless: process.env.HEADLESS !== 'false',
    actionTimeout: Number(process.env.ACTION_TIMEOUT || 15000),
    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT || 30000)
  }
} as const;
