export class StringBuilder {
  private readonly parts: string[] = [];
  private cachedResult?: string;

  public constructor(initial?: string) {
    if (initial === undefined) return;
    this.parts = [initial];
  }

  /**
   * All of the parts combined
   */
  public toString(): string {
    if (this.cachedResult === undefined)
      this.cachedResult = this.parts.join();

    return this.cachedResult;
  }
  /**
   * Formats a string and appends it with a newline at the end
   */
  public appendLineFormat(format: string, ...parameters: (number | string)[]): StringBuilder {
    this.appendFormat(format, ...parameters);
    this.appendLine();
    return this;
  }

  /**
   * Formats a string and appends it
   */
  public appendFormat(format: string, ...parameters: (number | string)[]): StringBuilder {
    this.append(string.format(format, ...parameters));
    return this;
  }


  /**
   * Joins `strings` together using the `separator` and appends it
   */
  public appendJoin(strings: string[], separator = ""): StringBuilder {
    if (strings.size() === 0)
      return this;

    this.append(strings.join(separator));
    return this;
  }

  /**
   * Joins `strings` together using the `separator` and appends it with a newline at the end of the joined string
   */
  public appendLineJoin(strings: string[], separator = ""): StringBuilder {
    this.appendJoin(strings, separator);
    this.appendLine();
    return this;
  }

  /**
   * Appends text onto the string
   */
  public append(text: string): StringBuilder {
    this.parts.push(text);
    this.invalidateCache();

    return this;
  }

  /**
   * Appends text with a new line at the end
   */
  public appendLine(text?: string): StringBuilder {
    if (text !== undefined)
      this.append(text);

    this.append("\n");
    return this;
  }

  private invalidateCache(): void {
    this.cachedResult = undefined;
  }
}