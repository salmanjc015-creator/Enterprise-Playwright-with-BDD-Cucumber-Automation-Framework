import { expect, Locator, Page } from '@playwright/test';
import { ContactUsFormData } from '../../utils/fakerData';
import { BasePage } from '../base/BasePage';

export class AeContactUsPage extends BasePage {
  readonly formHeading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageTextarea: Locator;
  readonly submitButton: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.formHeading = page.locator('.contact-form h2.title');
    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.subjectInput = page.locator('[data-qa="subject"]');
    this.messageTextarea = page.locator('[data-qa="message"]');
    this.submitButton = page.locator('[data-qa="submit-button"]');
    this.successAlert = page.locator('.contact-form .status.alert.alert-success');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/contact_us/);
    await expect(this.formHeading).toHaveText(/Get In Touch/i);
  }

  async submitContactForm(formData: ContactUsFormData): Promise<void> {
    await this.safeFill(this.nameInput, formData.name);
    await this.safeFill(this.emailInput, formData.email);
    await this.safeFill(this.subjectInput, formData.subject);
    await this.safeFill(this.messageTextarea, formData.message);

    // Automation Exercise displays a native browser confirmation dialog on submit.
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await this.safeClick(this.submitButton);
  }

  async expectSubmissionSuccess(): Promise<void> {
    await expect(this.successAlert).toBeVisible();
    await expect(this.successAlert).toContainText(
      'Success! Your details have been submitted successfully.'
    );
  }
}
