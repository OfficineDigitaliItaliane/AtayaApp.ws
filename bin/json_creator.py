from faker import Faker
import json
import random
import os

_AUDIO = [
    'answer1.mp3',
    'answer2.mp3',
    'understand1.mp3',
    'understand2.mp3',
    'audio.mp3',
    'speak.mp3',
    'read.mp3',
    'write.mp3'
]

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

_PICTURE = [
    'image-1.jpg',
    'image-2.jpg',
    'image-3.jpg',
    'image-4.jpg',
    'image-5.jpg',
    'image-6.jpg',
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg'
]


def understand():
    understand = []
    for i in range(0, 10):
        id = random.randrange(1, 1000)
        questions, answers = __questions(id)
        understand.append({
            "id":id,
            "unit_id":i,
            "video_url":_VIDEO[random.randrange(0, len(_VIDEO))],
            "audio":_AUDIO[random.randrange(0, len(_AUDIO))],
            "questions":questions,
            "answers":answers
        })
    return understand

def __questions(section_id):
    fake = Faker()
    q = []
    a = []
    for _ in range(10):
        idq = random.randrange(1, 1000)
        q.append({
            'id':idq,
            'section_id':section_id,
            'body':fake.sentence(),
            'audio':_AUDIO[random.randrange(0, len(_AUDIO))]
        })
        is_correct = False
        for _ in range(10):
            ida = random.randrange(1001, 2000)
            if is_correct:
                correct = False
            else:
                correct = bool(random.getrandbits(1))
                is_correct = correct
            a.append({
                'id': ida,
                'question_id':idq,
                'body':fake.sentence(),
                'audio':_AUDIO[random.randrange(0, len(_AUDIO))],
                'correct':correct
            })
    return q, a

def speak():
    speak = []
    for i in range(0, 10):
        for _ in range(10):
            speak.append({
                'id':random.randrange(0, 100),
                'unit_id':i,
                'picture':_PICTURE[random.randrange(0, len(_PICTURE))],
                'audio':_AUDIO[random.randrange(0, len(_AUDIO))],
            })
    return speak

def read():
    read = []
    for i in range(0, 10):
        id = random.randrange(0, 100)
        read.append({
            'id': id,
            'unit_id':i,
            'picture':_PICTURE[random.randrange(0, len(_PICTURE))],
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
            'id':random.randrange(101, 200),
            'read_id':id,
            'body':fake.word(ext_word_list=None),
            'audio':_AUDIO[random.randrange(0, len(_AUDIO))],
            'correct':correct
        })
    return options

def write():
    fake = Faker()
    write = []
    for i in range(0, 10):
        for _ in range(10):
            id = random.randrange(0, 100)
            word = fake.word(ext_word_list=None)
            if i <= 5:
                write.append({
                    'id': id,
                    'unit_id': i,
                    'picture': _PICTURE[random.randrange(0, len(_PICTURE))],
                    'word': word,
                    'type': 'basic',
                    'letters':_letters(word)
                })
            else:
                write.append({
                    'id': id,
                    'unit_id': i,
                    'picture': _PICTURE[random.randrange(0, len(_PICTURE))],
                    'word': word,
                    'type': 'advanced'
                })
    return write

def _letters(word):
    letters = []
    for key, value in enumerate(word):
        letters.append({
            'id':random.randrange(1, 1000),
            'text':value
        })
    return letters

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
