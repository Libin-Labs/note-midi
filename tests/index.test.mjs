import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('middle C', () => {
  assert.equal(api.noteToMidi('C4'), 60);
  assert.equal(api.midiToNote(60), 'C4');
});
test('accidental octave carry', () => {
  assert.equal(api.noteToMidi('B#3'), 60);
  assert.equal(api.noteToMidi('Cb4'), 59);
});
test('flat spelling', () => {
  assert.equal(api.midiToNote(61, true), 'Db4');
});
test('range endpoints', () => {
  assert.equal(api.noteToMidi('C-1'), 0);
  assert.equal(api.midiToNote(127), 'G9');
});
test('strict rejection', () => {
  for (const t of ['c4', 'C04', 'C4\n', 'C##4', 'Cb-1', 'A9'])
    assert.throws(() => api.noteToMidi(t));
  assert.throws(() => api.midiToNote(128));
});
test('all128 pitch classes', () => {
  for (let n = 0; n < 128; n++) {
    assert.equal(api.noteToMidi(api.midiToNote(n)), n);
    assert.equal(api.noteToMidi(api.midiToNote(n, true)), n);
  }
});
