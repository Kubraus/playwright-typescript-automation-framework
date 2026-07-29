import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator("input[name='email']");
    this.passwordInput = page.locator("input[name='password']");
    this.signInButton = page.locator("button[type='submit']");
    this.errorMessage = page.locator('.error-messages li');
  }

  async openLoginPage(): Promise<void> {
    await this.page.goto('/login');
  }

  async fillEmail(email: string): Promise<void> {
    await this.fill(this.emailInput, email);
  }

  async fillPassword(email: string): Promise<void> {
    await this.fill(this.passwordInput, email);
  }

  getSignInButton(): Locator {
    return this.signInButton;
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.click(this.signInButton);
  }

  async getErrorMessage(): Promise<string> {
    await this.waitForVisible(this.errorMessage);
    return this.errorMessage.innerText();
  }
}
