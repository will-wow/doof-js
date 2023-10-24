import { Transform } from "stream";

/** Add some type safety to a transformer stream. */
export class TypedTransform<K, T> extends Transform {
  private processChunk: (chunk: K, enc: BufferEncoding) => Promise<T>;

  constructor(processChunk: (chunk: K, enc: BufferEncoding) => Promise<T>) {
    super({ objectMode: true });
    this.processChunk = processChunk;
  }
  public pipe<T extends NodeJS.WritableStream>(
    destination: T,
    options?: { end?: boolean | undefined } | undefined
  ): T {
    return super.pipe(destination, options);
  }

  public async _transform(
    chunk: K,
    enc: BufferEncoding,
    cb: (error?: Error | null) => void
  ): Promise<void> {
    try {
      this.push(await this.processChunk(chunk, enc));
      cb();
    } catch (err) {
      cb(err as Error);
    }
  }
}
