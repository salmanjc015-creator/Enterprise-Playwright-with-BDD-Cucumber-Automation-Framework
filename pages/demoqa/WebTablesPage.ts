import { expect, Locator, Page } from '@playwright/test';
import { envConfig } from '../../utils/env';
import { WebTableEmployeeData } from '../../utils/fakerData';
import { BasePage } from '../base/BasePage';

export class DemoQaWebTablesPage extends BasePage {
  readonly addButton: Locator;
  readonly searchBox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly ageInput: Locator;
  readonly salaryInput: Locator;
  readonly departmentInput: Locator;
  readonly submitButton: Locator;
  readonly tableBody: Locator;

  constructor(page: Page) {
    super(page);
    this.addButton = page.locator('#addNewRecordButton');
    this.searchBox = page.locator('#searchBox');
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.ageInput = page.locator('#age');
    this.salaryInput = page.locator('#salary');
    this.departmentInput = page.locator('#department');
    this.submitButton = page.locator('#submit');
    this.tableBody = page.locator('.rt-tbody, table tbody').first();
  }

  async open(): Promise<void> {
    await this.goto(`${envConfig.urls.demoQa}/webtables`);
    await expect(this.addButton).toBeVisible();
  }

  async addEmployeeRecord(employee: WebTableEmployeeData): Promise<void> {
    await this.safeClick(this.addButton);
    await expect(this.firstNameInput).toBeVisible();

    await this.safeFill(this.firstNameInput, employee.firstName);
    await this.safeFill(this.lastNameInput, employee.lastName);
    await this.safeFill(this.emailInput, employee.email);
    await this.safeFill(this.ageInput, employee.age);
    await this.safeFill(this.salaryInput, employee.salary);
    await this.safeFill(this.departmentInput, employee.department);
    await this.safeClick(this.submitButton);
  }

  async searchTable(query: string): Promise<void> {
    await this.safeFill(this.searchBox, query);
  }

  async expectEmployeeVisible(employee: WebTableEmployeeData): Promise<void> {
    await expect(this.tableBody).toContainText(employee.firstName);
    await expect(this.tableBody).toContainText(employee.lastName);
    await expect(this.tableBody).toContainText(employee.email);
    await expect(this.tableBody).toContainText(employee.department);
  }
}
