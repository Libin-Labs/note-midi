import { noteToMidi, midiToNote } from '@lp-labs/note-midi';
if (noteToMidi('C4') !== 60 || midiToNote(61, true) !== 'Db4') throw new Error('Pitch');
// @ts-expect-error invalid argument must be rejected by declarations
noteToMidi(60);
