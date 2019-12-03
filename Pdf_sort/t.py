import os, shutil
import numpy as np
import cv2 as cv
import sys
from pdf2image import convert_from_path

all_files = os.listdir(sys.argv[1])
files = [i for i in all_files if i.endswith('.pdf')]
p1=sys.argv[1]+'/'+"no_image/"
p2=sys.argv[1]+'/'+"with_image/"
for file in files :
	path=sys.argv[1]+'/'+file
	pages = convert_from_path(path, 500)
	name='name.jpg'
	pages[0].save(name, 'JPEG')
	face_cascade = cv.CascadeClassifier('haarcascade_frontalface_default.xml')
	img = cv.imread(name)
	gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
	faces = face_cascade.detectMultiScale(gray, 1.3, 10)
	if len(faces)>0:
		print("The pdf has Image.")
		shutil.move(path,p2+file)

	else:
		print("No Image found.")
		shutil.move(path,p1+file)


	