import { test, expect } from '../src/fixtures/test.fixture';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

test('should download a text file successfully', async ({ fileDownloadPage }, testInfo) => {
  await fileDownloadPage.openDownloadPage();
  const download = await fileDownloadPage.downloadFile();
  await fileDownloadPage.shouldHaveExpectedFilename(download);
  expect(await download.failure()).toBeNull();
  const filePath = join(testInfo.outputDir, download.suggestedFilename());
  await download.saveAs(filePath);
  const fileContent = await readFile(filePath, 'utf-8');
  expect(fileContent).toBe('Hello from Playwright');
});
