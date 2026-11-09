import { Download, Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class FileDownloadPage extends BasePage {
  private readonly downloadLink: Locator;

  constructor(page: Page) {
    super(page);
    this.downloadLink = page.getByRole('link', { name: 'Download file' });
  }

  async openDownloadPage(): Promise<void> {
    await this.page.setContent(`
    <a
      href="data:text/plain;charset=utf-8,Hello%20from%20Playwright"
      download="test-file.txt"
    >
      Download file
    </a>
  `);
  }

  async downloadFile(): Promise<Download> {
    const downloadPromise = this.page.waitForEvent('download');

    await this.click(this.downloadLink);

    return await downloadPromise;
  }

  async shouldHaveExpectedFilename(download: Download): Promise<void> {
    expect(download.suggestedFilename()).toBe('test-file.txt');
  }
}
