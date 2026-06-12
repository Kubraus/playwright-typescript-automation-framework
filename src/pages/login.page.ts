import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator("input[name='email']");
    this.passwordInput = page.locator("input[name='password']");
    this.signInButton = page.locator("button[type='submit']");
  }

  async openLoginPage(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.signInButton);
  }
}
