import csv
import json
import time
import random
import urllib.request
import shutil
import os
import re

_BUCKET_URL = 'https://ruah-book.s3-eu-west-1.amazonaws.com'

_AUDIO_DIR = '/audio/'
_PICTURE_DIR = '/images/'
_UNDERSTAND_QUESTIONS = 4
_PATH = 'csv/'

def __get_remote_file(file_type, file_name):
    if file_type == 'audio':
        url = _BUCKET_URL+_AUDIO_DIR+file_name
    else:
        url = _BUCKET_URL+_PICTURE_DIR+file_name
    if not os.path.isfile('../book/'+file_name):
        with urllib.request.urlopen(url) as response, open("../book/"+file_name, 'wb') as out_file:
            shutil.copyfileobj(response, out_file)
    return file_name

def read_understand():
    understand=[]
    with open(_PATH+'capire.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        rows = list(reader)
        for row in rows:
            if row['URL video'] != "": 
                id = __get_id()
                questions, answers = __questions(id, row['Audio'], rows)
                understand.append({
                    "id":id,
                    "unit_id":2,
                    "video_url":re.sub(r'https:\/\/youtu\.be\/', "", row['URL video']),
                    "audio":__get_remote_file('audio',row['Audio']),
                    "questions":questions,
                    "answers":answers
                })
    
    return understand

def read_speak():
    speak = []
    with open(_PATH+'parlare.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        rows = list(reader)
        for row in rows:
            speak.append({
                'id':__get_id(),
                'unit_id':2,
                'picture':__get_remote_file('image', row['immagine']),
                'audio':__get_remote_file('audio', row['audio']),
            })
    return speak

def read_read():
    read = []
    with open(_PATH+'leggere.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        rows = list(reader)
        for row in rows:
            if row['immagine'] != "": 
                id = __get_id()
                read.append({
                    'id': id,
                    'unit_id':2,
                    'picture':__get_remote_file('image', row['immagine']),
                    'options':_options(id, row['check'], rows)
                })
    return read

def read_write():
    write = []
    with open(_PATH+'scrivere.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        rows = list(reader)
        for row in rows:
            write.append({
                'id': __get_id(),
                'unit_id': 2,
                'picture': __get_remote_file('image', row['immagine']),
                'audio': __get_remote_file('audio', row['audio']),
                'word': row['parola'],
                'type': 'basic',
                'letters':_letters(row['sillabe'])
            })
    return write

def _letters(word):
    letters = []
    for value in word.split("-"):
        letters.append({
            'id':__get_id(),
            'text':value,
            'order': _get_occurences(word, value)
        })
    return letters

def _get_occurences(word, letter):
    occ = []
    for key, value in enumerate(word.split("-")):
        if letter == value:
            occ.append(key)
    return occ


def _options(id, check, rows):
    options = []
    for row in rows:
        if row['check'] == check:
            options.append({
                'id':__get_id(),
                'read_id':id,
                'body':row['testo'],
                'audio':__get_remote_file('audio', row['audio']),
                'correct': True if row['corretto'] == 's' else False
            })
    return options

        
def __get_id():
    time.sleep(1)
    seed = random.randrange(1000, 11456)
    return int(time.time()) + seed

def __questions(id, audio, rows):
    q = []
    a = []
    for row in rows:
        idq = __get_id()
        if row['Audio'] == audio:
            q.append({
                'id':idq,
                'section_id':id,
                'body':row['Testo domanda'],
                'audio':__get_remote_file('audio', row['Audio domanda'])
            })
            for i in range(1, _UNDERSTAND_QUESTIONS):
                ida = __get_id()
                a.append({
                    'id':ida,
                    'question_id':idq,
                    'body':row['Risposta '+str(i)],
                    'audio':__get_remote_file('audio', row['Audio '+str(i)]),
                    'correct': True if row['corretta '+str(i)] == 's' else False
                })
    return q, a

def create_file(book):
    with open('../book/book.json', 'w+') as bf:
        bf.write(book)

if __name__ == '__main__':

    book = {
        'understand':read_understand(),
        'speak':read_speak(),
        'read':read_read(),
        'write':read_write()
    }
    create_file(json.dumps(book))