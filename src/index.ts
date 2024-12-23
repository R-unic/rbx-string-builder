export class StringBuilder {
	private buf: buffer;

	public constructor(initial?: string) {
		this.buf = initial !== undefined ?
			buffer.fromstring(initial)
			: buffer.create(0);
	}

	/**
	 * All of the parts combined
	 */
	public toString(): string {
		return buffer.tostring(this.buf);
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
		this.append(format.format(...parameters));
		return this;
	}


	/**
	 * Joins `strings` together using the `separator` and appends it
	 */
	public appendJoin(strings: string[], separator = ""): StringBuilder {
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
		const offset = buffer.len(this.buf);
		this.allocate(text.size());
		buffer.writestring(this.buf, offset, text, text.size());

		return this;
	}

	/**
	 * Appends text with a new line at the end
	 */
	public appendLine(text?: string): StringBuilder {
		this.append((text ?? "") + "\n");
		return this;
	}

	private allocate(bytes: number): void {
		const bufferSize = buffer.len(this.buf);
		const newBuf = buffer.create(bufferSize + bytes);
		buffer.copy(newBuf, 0, this.buf, 0, bufferSize);
		this.buf = newBuf;
	}
}