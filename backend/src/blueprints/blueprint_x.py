import os
import urllib.request
import openai
from flask import Blueprint, jsonify, request
from src.app import app

# define the blueprint
blueprint_x = Blueprint(name="blueprint_x", import_name=__name__)

# note: global variables can be accessed from view functions
openai.organization = 'org-cOjA7kYMoyM3OhfjzlRgkQOi'
openai.api_key = os.getenv('OPENAI_API_KEY')

# add view function to the blueprint
@blueprint_x.route('/test', methods=['GET'])
def test():
    output = {"msg": "I'm the test endpoint from blueprint_x."}
    return jsonify(output)

# add view function to the blueprint
@blueprint_x.route('/whisper', methods=['POST'])
def whisper():
    # retrieve body data from input JSON
    data = request.get_json()
    patient_id = data['patientId']
    audio_url = data['audioUrl']

    # speech-to-text conversion to chatGPT
    audio_file = urllib.request.urlretrieve(audio_url, f"transcribe_{patient_id}.mp3")
    transcript = openai.Audio.transcribe("whisper-1", open(audio_file[0], 'rb'))

    # read survey file
    with open(os.path.join(app.root_path, 'blueprints/survey.txt')) as file:
        survey = file.read().replace('\n', ' ')
    
    # process prompt w/ chatGPT 
    survey_response = openai.ChatCompletion.create(model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a social health worker"},
        {"role": "user", "content": f"This is the patient's social health history: {transcript['text']}"},
        {"role": "user", "content": '''Always respond to next question in this format:
            {
		    "question": "question",
		    "answer": "answer"
            }
        '''},

        {"role": "user", "content": f"Fill out the following survey: {survey}. ensure it is in the above format."}
    ]
    )

    return jsonify({
        'transcript': transcript['text'],
        'survey': survey_response['choices'][0]['message']['content'],
    })

@blueprint_x.route('/recommend', methods=['POST'])
def recommend():
    # retrieve body data from input JSON
    data = request.get_json()
    patient_id = data['patientId']
    survey_response = data['surveyResponse']

    # read resources
    with open(os.path.join(app.root_path, 'blueprints/resources.txt'), 'r') as f:
        resources = f.read().replace('\n', ' ')

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
        {"role": "user", "content": f"Recommend the best resource from the following list: {resources}. Respond in above format. Don't give any prior description."
        }
    ]
)

    return jsonify({
        'recommendations': resource_response['choices'][0]['message']['content'],
    })