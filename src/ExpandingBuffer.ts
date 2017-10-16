//
// ByteAccordion - JS library for smooth, Promise-based interaction with File and Buffer resources.
// ---
// @copyright (c) 2017 Damian Bushong <katana@odios.us>
// @license MIT license
// @url <https://github.com/damianb/ByteAccordion>
//

import { ExpandingResource } from './ExpandingResource'

//
// ExpandingBuffer - provides an "expanding" buffer stream to ease writing of byte-level resources.
//
export class ExpandingBuffer implements ExpandingResource {
  /**
   * The current working Buffer instance.
   *
   * @type {Buffer}
   */
  public buf: Buffer

  /**
   * How long the current Buffer instance is.
   * Provided for interface compatibility with ExpandingFile.
   *
   * @type {number}
   */
  public position: number

  /**
   * ExpandingBuffer constructor
   *
   * @return {ExpandingBuffer}
   */
  constructor () {
    this.buf = Buffer.alloc(0)
    this.position = 0
  }

  /**
   * Resets the expanding "buffer" to an empty state.
   *
   * @return {Promise:void} - returns the emptied buffer.
   */
  public async reset (): Promise<void> {
    this.buf = Buffer.alloc(0)
    this.position = 0

    return
  }

  /**
   * Write to the expanding "buffer".
   *
   * @param  {Buffer|Array|string|number} input - What to write to the buffer?
   *
   * @return {Promise:number} - Returns the length of the current buffer.
   */
  public async write (input: Buffer|any[]|string|number): Promise<number> {
    let inBuffer = null
    if (Buffer.isBuffer(input)) {
      inBuffer = input
    } else if (Array.isArray(input)) {
      // possible typescript bug - typescript can't seem to handle the overloading
      //   when we combine the Array check and string check.
      inBuffer = Buffer.from(input)
    } else if (typeof input === 'string') {
      inBuffer = Buffer.from(input)
    } else {
      inBuffer = Buffer.from([input])
    }

    this.buf = Buffer.concat([this.buf, inBuffer], this.buf.length + inBuffer.length)

    return (this.position = this.buf.length)
  }
}
