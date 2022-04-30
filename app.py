from flask import Flask, request, jsonify
from joblib import load
import pandas as pd

app = Flask(__name__)
classif_model = load("country_prediction_trained_model.joblib")
lat_long_country = pd.read_csv("lat_long_country.csv")
all_info_for_country = None

@app.route('/')
def hello_world():
    return 'Home page of Datacenter finder'

@app.route('/get_country/<lat>/<long>', methods=["GET"])
def get_country(lat=0,long=0):
    country = classif_model.predict([[lat,long]])[0]
    return f"you are in {country}"

@app.route('/get_list_of_country/', methods=["GET"])
def get_list_of_country():
    list_of_country = list(lat_long_country["Country/Region"].unique())
    str_of_country = ""
    for country in list_of_country:
        str_of_country = str_of_country + country + ","
    return str_of_country

@app.rout('/get_country_info/<country>',methods=["GET"])
def get_country_info(country=None):

