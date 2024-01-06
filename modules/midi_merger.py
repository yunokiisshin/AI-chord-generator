import mido
from mido import MidiFile

def merge_midi_files(file1, file2, output_file):
    # Load the two MIDI files
    midi1 = MidiFile(file1)
    midi2 = MidiFile(file2)

    # Create a new MIDI file to store the merged tracks
    merged_midi = MidiFile()

    # Assuming each file has one track, append these tracks to the new MIDI file
    for track in midi1.tracks:
        merged_midi.tracks.append(track)
    for track in midi2.tracks:
        merged_midi.tracks.append(track)

    # Save the merged MIDI file
    merged_midi.save(output_file)

# Example usage
# merge_midi_files('midi_file1.mid', 'midi_file2.mid', 'merged_midi.mid')
