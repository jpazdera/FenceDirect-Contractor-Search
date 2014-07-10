import csv

def csv_to_json(file):
    dict = {}
    with open(file, 'rb') as d:
        reader = csv.DictReader(d)
        for row in reader:
            zip = row['Zip']
            if zip not in dict:
                dict[zip] = []
            dict[zip].append(row)
    print dict
        
csv_to_json('contractor_info.csv')