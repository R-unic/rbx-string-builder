export class StringBuilder {
	private buf: buffer;
	private cachedResult?: string;

	public constructor(initial?: string) {
		this.buf = initial !== undefined ?
			buffer.fromstring(initial)
			: buffer.create(0);
	}

	/**
	 * All of the parts combined
	 */
	public toString(): string {
		if (this.cachedResult === undefined)
			this.cachedResult = buffer.tostring(this.buf);

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

		const totalSize = strings.reduce((sum, text) => sum + text.size(), 0) + separator.size() * (strings.size() - 1);
		this.allocate(totalSize);
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
		const textSize = text.size();
		this.allocate(textSize);
		buffer.writestring(this.buf, offset, text, textSize);
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

	/**
	 * @see https://blog.mozilla.org/nnethercote/2014/11/04/please-grow-your-buffers-exponentially/
	 */
	private allocate(bytes: number): void {
		const currentSize = buffer.len(this.buf);
		const requiredSize = currentSize + bytes;
		if (requiredSize > currentSize) {
			let newSize = currentSize === 0 ? 16 : currentSize;
			while (newSize < requiredSize)
				newSize *= 2;

			const newBuf = buffer.create(newSize);
			buffer.copy(newBuf, 0, this.buf, 0, currentSize);
			this.buf = newBuf;
		}
	}
}