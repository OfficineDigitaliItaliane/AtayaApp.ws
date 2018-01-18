from faker import Faker
import json
import random
import os
import urllib.request
import shutil
import time

_BUCKET_URL = 'https://ruah-book.s3-eu-west-1.amazonaws.com'

_AUDIO_DIR = '/audio/'
_PICTURE_DIR = '/images/'

_VIDEO = [
    'https://youtu.be/x-Bpoj5fZr0',
    'https://youtu.be/eyknGvncKLw',
    'https://youtu.be/XVQlnP5Yu2A',
    'https://youtu.be/Sw2KZki-eaA',
    'https://youtu.be/oTEYzTSX3pg',
    'https://youtu.be/xJSVrq-6-jc',
    'https://youtu.be/AJVji9PinWw',
    'https://youtu.be/Dpa53jyVgmY'
]

def __get_remote_file(file_type):
    if file_type == 'audio':
        file_name = "{}.mp3".format(random.randrange(1, 11))
        url = _BUCKET_URL+_AUDIO_DIR+file_name
    else:
        file_name = "{}.jpg".format(random.randrange(1, 11))
        url = _BUCKET_URL+_PICTURE_DIR+file_name
    if not os.path.isfile('../book/'+file_name):
        with urllib.request.urlopen(url) as response, open("../book/"+file_name, 'wb') as out_file:
            shutil.copyfileobj(response, out_file)
    return file_name

def __get_id():
    time.sleep(1)
    return int(time.time())

def understand():
    understand = []
    for i in range(0, 10):
        id = __get_id()
        questions, answers = __questions(id)
        understand.append({
            "id":id,
            "unit_id":i,
            "video_url":_VIDEO[random.randrange(0, len(_VIDEO))],
            "audio":__get_remote_file('audio'),
            "questions":questions,
            "answers":answers
        })
    return understand

def __questions(section_id):
    fake = Faker()
    q = []
    a = []
    for _ in range(10):
        idq = __get_id()
        q.append({
            'id':idq,
            'section_id':section_id,
            'body':fake.sentence(),
            'audio':__get_remote_file('audio')
        })
        is_correct = False
        for _ in range(10):
            time.sleep(0.5)
            ida = int(time.time())
            if is_correct:
                correct = False
            else:
                correct = bool(random.getrandbits(1))
                is_correct = correct
            a.append({
                'id': ida,
                'question_id':idq,
                'body':fake.sentence(),
                'audio':__get_remote_file('audio'),
                'correct':correct
            })
    return q, a

def speak():
    speak = []
    for i in range(0, 10):
        for _ in range(10):
            speak.append({
                'id':__get_id(),
                'unit_id':i,
                'picture':__get_remote_file('image'),
                'audio':__get_remote_file('audio'),
            })
    return speak

def read():
    read = []
    for i in range(0, 10):
        id = __get_id()
        read.append({
            'id': id,
            'unit_id':i,
            'picture':__get_remote_file('image'),
            'options':_options(id)
        })
    return read

def _options(id):
    fake = Faker()
    options = []
    is_correct = False
    for i in range(0, random.randrange(4, 11)):
        if is_correct:
            correct = False
        else:
            correct = bool(random.getrandbits(1))
            is_correct = correct
        options.append({
            'id':__get_id(),
            'read_id':id,
            'body':fake.word(ext_word_list=None),
            'audio':__get_remote_file('audio'),
            'correct':correct
        })
    return options

def write():
    fake = Faker()
    write = []
    for i in range(0, 10):
        for _ in range(10):
            id = __get_id()
            word = fake.word(ext_word_list=None)
            if i <= 5:
                write.append({
                    'id': id,
                    'unit_id': i,
                    'picture': __get_remote_file('image'),
                    'word': word,
                    'type': 'basic',
                    'letters':_letters(word)
                })
            else:
                write.append({
                    'id': id,
                    'unit_id': i,
                    'picture': __get_remote_file('image'),
                    'word': word,
                    'type': 'advanced'
                })
    return write

def _letters(word):
    letters = []
    for key, value in enumerate(set(word)):
        if value not in letters:
            letters.append({
                'id': 1000 + key,
                'text': value,
                'order': _get_occurences(word, value)
            })
    return letters

def _get_occurences(word, letter):
    occ = []
    for key, value in enumerate(word):
        if letter == value:
            occ.append(key)
    return occ

def create_file(book):
    with open('../book/book.json', 'w+') as bf:
        bf.write(book)


if __name__ == '__main__':
    book = {
        'understand':understand(),
        'speak':speak(),
        'read':read(),
        'write':write()
    }
    create_file(json.dumps(book))
