import { BasePage } from './base.page';
import { Locator, Page, expect } from '@playwright/test';

export class SignUpPage extends BasePage {
  private readonly signUpButton: Locator;
  private readonly usernameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;

  constructor(page: Page) {
    super(page);
    this.signUpButton = page.getByRole('button', { name: /Sign Up/i });
    this.usernameInput = page.locator("input[name='username']");
    this.emailInput = page.locator("input[name='email']");
    this.passwordInput = page.locator("input[name='password']");
  }

  async openSignUpPage(): Promise<void> {
    await this.page.goto(`/register`);
  }

  async fillUsername(username: string): Promise<void> {
    await this.fill(this.usernameInput, username);
  }

  async fillEmail(email: string): Promise<void> {
    await this.fill(this.emailInput, email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password);
  }

  getSignUpButton(): Locator {
    return this.signUpButton;
  }

  async register(username: string, email: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.click(this.signUpButton);
  }

  async shouldBeOnSignUpPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/register/);
  }
}
