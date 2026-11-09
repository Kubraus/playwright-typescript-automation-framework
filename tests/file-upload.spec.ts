import { test } from '../src/fixtures/test.fixture';

test('should successfully upload a valid CSV file', async ({ fileUploadPage }) => {
  await fileUploadPage.openUploadPage();
  await fileUploadPage.uploadFile('src/test-data/files/contacts.csv');
  await fileUploadPage.shouldUploadSucceed('contacts.csv');
});

test('should reject a CSV file larger than 500 KB', async ({ fileUploadPage }) => {
  await fileUploadPage.openUploadPage();
  await fileUploadPage.uploadFile('src/test-data/files/large-file.csv');
  await fileUploadPage.shouldShowFileTooLargeError();
});
