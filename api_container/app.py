import pandas as pd
from flask import Flask, jsonify, request
from joblib import load

app = Flask(__name__)
classif_model = load("country_prediction_trained_model.joblib")
lat_long_country = pd.read_csv("lat_long_country.csv")
every_score_per_country = pd.read_csv("every_score_per_country.csv")


@app.route("/")
def hello_world():
    return "Home page of Datacenter finder"


@app.route("/get_country/<lat>/<long>", methods=["GET"])
def get_country(lat=0, long=0):
    country = classif_model.predict([[lat, long]])[0]
    return f"you are in {country}"


@app.route("/get_list_of_country/", methods=["GET"])
def get_list_of_country():
    list_of_country = list(lat_long_country["Country/Region"].unique())

    response = {}
    for country in list_of_country:
        lat = lat_long_country[lat_long_country["Country/Region"] == country].iloc[0][
            "Lat"
        ]
        long = lat_long_country[lat_long_country["Country/Region"] == country].iloc[0][
            "Long"
        ]

        response[country] = {"lat": lat, "long": long}

    return jsonify(response)


@app.route("/get_country_info/<country>", methods=["GET"])
def get_country_info(country=None):
    if not country:
        return "Country is None"
    else:
        response = {}
        for column in every_score_per_country[
            every_score_per_country["Country/Region"] == country
        ].columns:

            response[column] = every_score_per_country[
                every_score_per_country["Country/Region"] == country
            ].iloc[0][column]
        print(response)
        return jsonify(response)
