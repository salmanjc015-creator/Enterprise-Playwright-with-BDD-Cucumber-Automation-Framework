import { Page, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export interface A11yScanOptions {
  tags?: string[];
  includedImpacts?: ('minor' | 'moderate' | 'serious' | 'critical')[];
  disableRules?: string[];
}

/**
 * Enterprise Accessibility (a11y) audit helper powered by Axe-core.
 * Enforces WCAG 2.1 Level A & AA compliance across pages and components.
 */
export class A11yHelper {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Scans the current page and asserts zero WCAG accessibility violations.
   */
  async expectNoViolations(options: A11yScanOptions = {}): Promise<void> {
    const {
      tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      includedImpacts = ['serious', 'critical'],
      disableRules = []
    } = options;

    let builder = new AxeBuilder({ page: this.page }).withTags(tags);

    if (disableRules.length > 0) {
      builder = builder.disableRules(disableRules);
    }

    const results = await builder.analyze();
    const filteredViolations = results.violations.filter((v) =>
      v.impact ? includedImpacts.includes(v.impact as any) : true
    );

    if (filteredViolations.length > 0) {
      const summary = filteredViolations
        .map(
          (v) =>
            `[${v.impact?.toUpperCase()}] Rule: "${v.id}" - ${v.description}\nHelp: ${v.helpUrl}\nAffected nodes: ${v.nodes.length}`
        )
        .join('\n\n');

      expect(
        filteredViolations,
        `Expected 0 WCAG accessibility violations (${includedImpacts.join(', ')}), but found ${filteredViolations.length}:\n\n${summary}`
      ).toEqual([]);
    }
  }

  /**
   * Returns raw scan results for custom assertions or reporting attachments.
   */
  async scan(options: A11yScanOptions = {}) {
    const { tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } = options;
    return await new AxeBuilder({ page: this.page }).withTags(tags).analyze();
  }
}
