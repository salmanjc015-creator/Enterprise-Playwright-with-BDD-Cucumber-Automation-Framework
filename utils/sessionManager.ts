import * as fs from 'fs';
import * as path from 'path';

/**
 * Utility for persisting and retrieving Playwright storageState files
 * to demonstrate session reuse, skipping repetitive UI login steps.
 */
export class SessionManager {
  private static readonly AUTH_DIR = path.resolve(process.cwd(), '.auth');

  /**
   * Returns the file path for a given role's storage state JSON.
   */
  static getStorageStatePath(role: string = 'standard_user'): string {
    return path.join(this.AUTH_DIR, `${role}.json`);
  }

  /**
   * Ensures that a valid Playwright storageState JSON file exists on disk
   * for SauceDemo, containing pre-authenticated session cookies.
   */
  static ensureSauceDemoSession(role: 'standard_user' | 'locked_out_user' = 'standard_user'): string {
    if (!fs.existsSync(this.AUTH_DIR)) {
      fs.mkdirSync(this.AUTH_DIR, { recursive: true });
    }

    const stateFilePath = this.getStorageStatePath(role);

    // Write a standard Playwright storageState object with pre-authenticated session cookie
    const storageState = {
      cookies: [
        {
          name: 'session-username',
          value: role,
          domain: 'www.saucedemo.com',
          path: '/',
          expires: Math.floor(Date.now() / 1000) + 86400, // 24 hours
          httpOnly: false,
          secure: true,
          sameSite: 'Lax' as const
        }
      ],
      origins: [
        {
          origin: 'https://www.saucedemo.com',
          localStorage: [
            {
              name: 'cart-contents',
              value: '[]'
            }
          ]
        }
      ]
    };

    fs.writeFileSync(stateFilePath, JSON.stringify(storageState, null, 2), 'utf-8');
    return stateFilePath;
  }
}
