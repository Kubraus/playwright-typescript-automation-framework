import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class FileUploadPage extends BasePage {
  private readonly fileInput: Locator;
  private readonly uploadButton: Locator;
  private readonly successHeading: Locator;
  private readonly errorAlert: Locator;

  constructor(page: Page) {
    super(page);

    this.fileInput = page.getByTestId('file-input');
    this.uploadButton = page.getByTestId('file-submit');
    this.successHeading = page.getByRole('heading', { name: 'File Uploaded!' });
    this.errorAlert = page.getByRole('alert');
  }

  async openUploadPage(): Promise<void> {
    await this.page.goto('https://practice.expandtesting.com/upload');
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.fileInput.setInputFiles(filePath);
    await this.click(this.uploadButton);
  }

  async shouldUploadSucceed(fileName: string): Promise<void> {
    await expect(this.successHeading).toBeVisible();
    await expect(this.page.getByText(fileName, { exact: false })).toBeVisible();
  }

  async shouldShowFileTooLargeError(): Promise<void> {
    await expect(this.errorAlert).toHaveText(
      'File too large, please select a file less than 500KB',
    );
  }
}
