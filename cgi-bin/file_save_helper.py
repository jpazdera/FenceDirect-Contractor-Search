#!/usr/local/bin/python
import cgi

def overwrite_data(d):
    file = open("contractor_info2.js", "w")
    file.write(d)
    file.close

form = cgi.FieldStorage()
data = form.getfirst("text", "")
if data != "":
    overwrite_data(data)