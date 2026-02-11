export function detectLanguage(code) {
  const text = code.trim();

  if (/^#include\s+<iostream>|std::|cout\s*<</m.test(text)) {
    return "cpp";
  }

  if (/^#include\s+<stdio.h>|printf\s*\(/m.test(text)) {
    return "c";
  }

  if (/package\s+main|func\s+main|fmt\.Println/m.test(text)) {
    return "go";
  }

  if (/public\s+class|static\s+void\s+main|System\.out\.println/m.test(text)) {
    return "java";
  }

  if (/function\s+\w+|\b(const|let|var)\b|=>|console\.log/m.test(text)) {
    return "javascript";
  }

  if (/def\s+\w+|import\s+\w+|print\s*\(|^#/m.test(text)) {
    return "python";
  }

  return null;
}
