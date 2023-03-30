import openai
import os
import urllib
from pathlib import Path
from src.app import app

openai.organization = 'org-cOjA7kYMoyM3OhfjzlRgkQOi'
openai.api_key = os.getenv('OPENAI_API_KEY')

# audio_url = ''
# audio_file = urllib.request.urlretrieve(audio_url, f"test.mp3")

# # audio_file= open("/Users/abbirdboy/Desktop/example_pt_hx.m4a", "rb")
# transcript = openai.Audio.transcribe("whisper-1", audio_file)

# print(transcript)
with open(os.path.join(app.root_path, 'blueprints/resources.txt'), 'r') as f:
    resources = f.read().replace('\n', ' ')

with open(os.path.join(app.root_path, 'blueprints/survey_response.txt'), 'r') as f:
    survey_response = f.read().replace('\n', ' ')

resource_response = openai.ChatCompletion.create(model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a social health worker who responsds in the following format:"
        },
        {"role": "user", "content": ''' Always respond in the following format:
                "resources": [{
                "title": "title",
                "description": "desc",
                "thumbnail": "img",
                "url": ""}]
        
        '''
        },
        {"role": "user", "content": f"Read this survey response: {survey_response}"},
        {"role": "user", "content": f"Recommend the best resource from the following list: {resources}. Response above format."
        }
    ]
)

print(resource_response)