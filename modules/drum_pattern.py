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
    
    # define the delay effect for drunkbeat
    delay = 100
    
    # Create the drum pattern
    for bar in range(4):
        for beat in range(8): # 2-bar set
            # Add the kick drum note
            track.append(Message('note_on', note=kick, velocity=64, time=0))
            track.append(Message('note_off', note=kick, velocity=64, time=480))
            
            # Add the hi-hat note
            track.append(Message('note_on', note=hi_hat, velocity=64, time=delay))
            track.append(Message('note_off', note=hi_hat, velocity=64, time=480-delay))
            
            # Add the snare drum note
            track.append(Message('note_on', note=snare, velocity=64, time=0))
            track.append(Message('note_off', note=snare, velocity=64, time=480))
            
            # Add the hi-hat note again
            track.append(Message('note_on', note=hi_hat, velocity=64, time=delay))
            track.append(Message('note_off', note=hi_hat, velocity=64, time=480-delay))
    
            
            # Add the kick drum note
            track.append(Message('note_on', note=kick, velocity=64, time=0))
            track.append(Message('note_off', note=kick, velocity=64, time=480))
            
            # Add the hi-hat note
            track.append(Message('note_on', note=kick, velocity=64, time=delay))
            track.append(Message('note_off', note=kick, velocity=64, time=480-delay))
            
            # Add the snare drum note
            track.append(Message('note_on', note=snare, velocity=64, time=0))
            track.append(Message('note_off', note=snare, velocity=64, time=480))
            
            # Add the hi-hat note again
            track.append(Message('note_on', note=hi_hat, velocity=64, time=delay))
            track.append(Message('note_off', note=hi_hat, velocity=64, time=480-delay))
    
    # Save the MIDI file to the specified directory
    filename = "./drum_pattern.mid"
    mid.save(filename)
    return filename
    
# create_standard_drum_pattern()