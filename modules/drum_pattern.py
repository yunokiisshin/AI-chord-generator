import mido
from mido import MidiFile, MidiTrack, Message, bpm2tempo

def create_standard_drum_pattern(tempo=120):
    # Create a new MIDI file
    mid = MidiFile()
    
    # Set the tempo of the MIDI file
    mid.ticks_per_beat = 480
    track = MidiTrack()
    mid.tracks.append(track)
    track.append(mido.MetaMessage('set_tempo', tempo=bpm2tempo(tempo)))
    
    # Define the drum notes
    kick = 36
    hi_hat = 42
    snare = 38
    
    # Create the drum pattern
    for bar in range(8):
        for beat in range(4):
            # Add the kick drum note
            track.append(Message('note_on', note=kick, velocity=64, time=0))
            track.append(Message('note_off', note=kick, velocity=64, time=480))
            
            # Add the hi-hat note
            track.append(Message('note_on', note=hi_hat, velocity=64, time=0))
            track.append(Message('note_off', note=hi_hat, velocity=64, time=480))
            
            # Add the snare drum note
            track.append(Message('note_on', note=snare, velocity=64, time=0))
            track.append(Message('note_off', note=snare, velocity=64, time=480))
            
            # Add the hi-hat note again
            track.append(Message('note_on', note=hi_hat, velocity=64, time=0))
            track.append(Message('note_off', note=hi_hat, velocity=64, time=480))
    
    # Save the MIDI file to the specified directory
    mid.save('./drum_pattern.mid')
    
create_standard_drum_pattern()