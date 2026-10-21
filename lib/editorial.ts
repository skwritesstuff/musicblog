/** Keep computed archive totals current while allowing the surrounding copy to be edited. */
export function editorialText(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (token, key: string) => key in values ? String(values[key]) : token);
}
