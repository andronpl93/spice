from django.shortcuts import render
from django.http import HttpResponse
import json
import csv
import urllib.request
import xml.etree.ElementTree as et
import time
import logging

# Create your views here.
def start(request):
    images=['1.png','2.png','3.png','4.png']
    return render(request,'pipka/index.html',{'images':images})

def graf(request):
    url = [ ['jpy',"http://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/jpy.xml"]]
           # ['usd','http://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/usd.xml'],
          #  ['cad',"http://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/cad.xml"],
          #  ['aud',"http://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/aud.xml"],
           # ['qbp',"http://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/gbp.xml"]]
    paket={'dat':[],'len':len(url)}
    Data = []
    for u in range(len(url)):
        tree = []
        logging.debug("2");
        tree.append(et.parse(urllib.request.urlopen(url[u][1])))  
        logging.debug("2");
        root = []
        for i in range(len(tree)):
            root.append(tree[i].getroot())   

        a = []
        for i in range(len(root)):
            for j in range(len(root[i])):
                a.append(root[i][j])

        b = []
        for i in range(len(a)):
            for j in range(len(a[i])):
                b.append(a[i][j])

        
        paket['dat'].append([url[u][0]]);
        paket['dat'].append([]);
        for i in range(len(b)):
            for j in range(len(b[i])):
                    if b[i][j].get("OBS_VALUE"):
                        paket['dat'][-1].append([])
                        mil=time.mktime(time.strptime(b[i][j].get("TIME_PERIOD"), '%Y-%m-%d'))*1000
                        mil=int(mil)
                        paket['dat'][-1][-1].append(mil)
                        paket['dat'][-1][-1].append(float(b[i][j].get("OBS_VALUE")))
                
            
    for i in range(1,len(paket['dat']),2):
        standart=paket['dat'][i][0][-1]
        for j in range(len(paket['dat'][i][:])):
            paket['dat'][i][j][-1]=round(paket['dat'][i][j][-1]/standart,2)
    

        
    return HttpResponse(json.dumps(paket))
    
    
    
    
    
logging.basicConfig(
	level = logging.DEBUG,
	format = '%(asctime)s %(levelname)s %(message)s',
)