from app import app
import json
from flask import Flask,render_template,request
# Company Profile page
@app.route('/CompanyProfile',methods=['GET','POST'])
def CompanyProfile():
    query_params = dict(request.args)
    return render_template("CompanyProfile.html",args=query_params['symbol'])

    
   