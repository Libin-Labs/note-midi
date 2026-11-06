function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
  flats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const pitch: Readonly<Record<string, number>> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
export function noteToMidi(note: string): number {
  strictText(note, 5);
  if (/[^A-G#b0-9-]/.test(note)) throw new RangeError('Invalid pitch');
  const m = /^([A-G])([#b]?)(-1|[0-9])$/.exec(note);
  if (!m) throw new RangeError('Expected scientific pitch');
  return integer(
    (Number(m[3]) + 1) * 12 + pitch[m[1]!]! + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0),
    0,
    127,
  );
}
export function midiToNote(note: number, useFlats = false): string {
  integer(note, 0, 127);
  if (typeof useFlats !== 'boolean') throw new TypeError('Expected boolean');
  return (useFlats ? flats : names)[note % 12]! + String(Math.floor(note / 12) - 1);
}
