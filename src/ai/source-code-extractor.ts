import { readFile } from 'fs/promises';
import { resolve, sep } from 'node:path';

export interface SourceLocation {
  filePath: string;
  line: number;
  column: number;
}

export function extractSourceLocation(stackTrace: string): SourceLocation | null {
  const lines = stackTrace.split('\n');
  for (const line of lines) {
    const match = line.match(/\((.*):(\d+):(\d+)/) ?? line.match(/at (.*):(\d+):(\d+)/);
    if (match !== null) {
      return {
        filePath: match[1],
        line: Number(match[2]),
        column: Number(match[3]),
      };
    }
  }
  return null;
}

export async function extractSourceCode(location: SourceLocation): Promise<string | undefined> {
  const projectRoot = process.cwd();
  const projectRootWithSeparator = projectRoot + sep;
  const fullPath = resolve(projectRoot, location.filePath);
  let sourceCode: string;
  if (!fullPath.startsWith(projectRootWithSeparator)) {
    console.error(`[AI Analyzer] Source file is outside the project: ${location.filePath}`);
    return undefined;
  }
  try {
    sourceCode = await readFile(fullPath, 'utf8');
  } catch {
    console.error(`[AI Analyzer] Unable to read source file: ${location.filePath}`);
    return undefined;
  }

  const lines = sourceCode.split('\n');
  const errorLineIndex = location.line - 1;
  if (errorLineIndex < 0 || errorLineIndex >= lines.length) {
    console.log(`[AI Analyzer] Source line ${location.line} is outside the file`);
    return undefined;
  }

  const start = Math.max(0, errorLineIndex - 3);
  const end = Math.min(lines.length, errorLineIndex + 4);
  return lines
    .slice(start, end)
    .map((line, index) =>
      start + index === errorLineIndex
        ? `> ${start + index + 1} | ${line}`
        : `  ${start + index + 1} | ${line}`,
    )
    .join('\n');
}
