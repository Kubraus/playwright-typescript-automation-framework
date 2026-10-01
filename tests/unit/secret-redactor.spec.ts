import { test, expect } from '@playwright/test';
import { redactSecrets, removeAnsiCodes } from '../../src/ai/secret-redactor';

test('Should redact password from key-value format', () => {
  const result = redactSecrets('password=SuperSecret123');
  expect(result).toBe('password=[REDACTED]');
});

test('Should redact bearer token', () => {
  const result = redactSecrets('Authorization: Bearer abc123SUPER_SECRET_TOKEN');
  expect(result).toBe('Authorization: Bearer [REDACTED]');
});

test('Should redact Authorization token', () => {
  const result = redactSecrets('Authorization: Token token_123456789');
  expect(result).toBe('Authorization: Token [REDACTED]');
});

test('Should redact bearer token case-insensitively', () => {
  const result = redactSecrets('authorization: bearer TOP_SECRET');
  expect(result).toContain('[REDACTED]');
  expect(result).not.toContain('TOP_SECRET');
});

test('Should redact password from source code', () => {
  const result = redactSecrets("const password = 'MySourceCodeSecret123';");
  expect(result).toBe("const password = '[REDACTED]';");
});

test('Should redact password from JSON', () => {
  const result = redactSecrets('{"username":"Jacob","password":"SuperSecret123"}');
  expect(result).toBe('{"username":"Jacob","password":"[REDACTED]"}');
});

test('Should remove ANSI codes', () => {
  const result = removeAnsiCodes('\x1B[31mExpected\x1B[39m');
  expect(result).toBe('Expected');
});

test('Should remove ANSI codes with multiple parameters', () => {
  const result = removeAnsiCodes('\x1B[1;31mExpected\x1B[0m');
  expect(result).toBe('Expected');
});
