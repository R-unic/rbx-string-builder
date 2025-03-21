declare class StringBuilder {
  public constructor(initial?: string);

  /**
   * All of the parts combined
   */
  public toString(): string;
  /**
   * Prepends text onto the string
   */
  public prepend(text: string): StringBuilder;
  /**
   * Prepends text with a new line at the end
   */
  public prependLine(text?: string): StringBuilder;
  /**
   * Appends text onto the string
   */
  public append(text: string): StringBuilder;
  /**
   * Appends text with a new line at the end
   */
  public appendLine(text?: string): StringBuilder;
  /**
   * Formats a string and appends it with a newline at the end
   */
  public appendLineFormat(format: string, ...parameters: (number | string)[]): StringBuilder;

  /**
   * Formats a string and appends it
   */
  public appendFormat(format: string, ...parameters: (number | string)[]): StringBuilder;
  /**
   * Joins `strings` together using the `separator` and appends it
   */
  public appendJoin(strings: string[], separator?: string): StringBuilder;
  /**
   * Joins `strings` together using the `separator` and appends it with a newline at the end of the joined string
   */
  public appendLineJoin(strings: string[], separator?: string): StringBuilder;
}

export = StringBuilder;