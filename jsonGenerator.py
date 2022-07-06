import os
from pydoc import importfile


import os
from re import sub
from os import listdir
from os.path import isfile, join
import json

study = []
subfolders = [ f.path for f in os.scandir("./public") if f.is_dir() ]
for folder in subfolders:
  if("Chart" in folder):
    onlyfiles = [f for f in listdir(folder) if isfile(join(folder, f))]
    for file in onlyfiles:
      token = file.split(".png")[0].split("_")
      if token[2] != 'None':
        chart = {"chartId":token[0], "questionType": token[1], 'algorithm': token[2], "Privacy": token[3], "Bin":token[4]}
      
        chart['algorithmImg'] = file
        chart['binnedImg'] = token[0]+"_Binned_None_None_" + token[4] + ".png"
        study.append(chart)
with open("./src/Data/studyData.json", "w") as outfile:
    json.dump(study, outfile, indent=2)