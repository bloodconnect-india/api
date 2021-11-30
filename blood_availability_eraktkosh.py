from os import error
from bs4 import BeautifulSoup
import requests
import csv
from requests.models import Response

#array to catch error entries
arr= []
city_list = {'35':'andaman_and_nicobar_islands','28':'andhra_pradesh','12':'arunachal_pradesh','18':'assam','10':'bihar','94':'chandigarh','22':'chhattisgarh','26':'dadra_nagar_haveli','25':'daman_diu','97':'delhi','24':'gujarat','30':'goa','96':'haryana','92':'himachal','91':'jammu_and_kashmir','20':'jharkhand','29':'karnataka','32':'kerala','37':'ladakh','31':'lakshdweep','23':'madhya_pradesh','27':'maharashtra','14':'manipur','17':'meghalaya','15':'mizoram','13':'nagaland','21':'odisha','34':'puducherry','93':'punjab','98':'rajasthan','11':'sikkim','33':'tamil_nadu','36':'telangana','16':'tripura','95':'uttarakhand','99':'uttar_pradesh','19':'west_bengal'}

for item in city_list:
    city_code = item
    file_name = city_list[item] + "_data.csv"
    csv_file = open(file_name,'w')
    csv_writer = csv.writer(csv_file)
    csv_writer.writerow(['S.no', 'Name', 'Adress', 'Phone', 'Email','Category','Availibility','Last Time Updated','Type'])

    short_url = "https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYSTOCKDETAILS&stateCode=" + city_code + "&districtCode=-1&bloodGroup=all&bloodComponent=11&lang=0&_=1633202320971"
    response = requests.get(short_url)
    response.raise_for_status()
    entry = response.json()['data']
    for i in range(0, len(entry)):
        try:
            flag = 0
            #serial number
            s_number = entry[i][0]
            #details - name + adress
            details = entry[i][1].split('<br/>')
            name = details[0]
            adress = details[1]
            #phone mail and fax
            if details[2] != 'null':
                string = details[2].replace('Phone: ','?')  
                string2 = string.replace(',Fax: ','?')
                string3 = string2.replace('Email: ','?')

                phone = string3.split('?')[1]
                fax = string3.split('?')[2].replace(',',' ')
                email = string3.split('?')[3]
                flag = 1
            
            if flag == 0:
                phone = '-'
                email = '-'
                fax = '-'
            #category
            category = entry[i][2]
            #availability
            availability = entry[i][3]
            if 'Not' in availability:
                availability = 'NA'
            else:
                availability = availability.replace("<p class='text-success'>Available, ", " ")
                availability = availability.replace("</p>", " ")
            #updated time
            time_updated = entry[i][4]
            if 'live' in time_updated:
                time_updated =  "LIVE"
            #type
            Type = entry[i][5]
            csv_writer.writerow([s_number,name,adress,phone,email,category,availability,time_updated,Type])
            
        except:
            arr.append(i)
    csv_file.close()
    print(arr)