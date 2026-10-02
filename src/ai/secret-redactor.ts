export function redactSecrets(value: string): string {
  let redacted = value;

  // Redacts tokens from Authorization headers.
  redacted = redacted.replace(
    /Authorization:\s+(Bearer|Token)\s+\S+/gi,
    'Authorization: $1 [REDACTED]',
  );

  // Redacts passwords stored as quoted values in source code.
  redacted = redacted.replace(/(password\s*=\s*)(['"`])[^'"`]+\2/gi, '$1$2[REDACTED]$2');

  // Redacts unquoted password values in key-value format.
  redacted = redacted.replace(/(password\s*=\s*)[^'"`\s]+/gi, '$1[REDACTED]');

  // Redacts passwords stored as JSON values.
  redacted = redacted.replace(/("password"\s*:\s*)"[^"]+"/gi, '$1"[REDACTED]"');

  return redacted;
}

export function removeAnsiCodes(value: string): string {
  let cleanText = value;
  // Removes terminal formatting codes to keep AI input clean and readable.
  cleanText = cleanText.replace(/\x1B\[[\d;]+m/g, '');
  return cleanText;
}
