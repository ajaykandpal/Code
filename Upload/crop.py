import numpy as np
import cv2 as cv
import sys
face_cascade = cv.CascadeClassifier('haarcascade_frontalface_default.xml')
# eye_cascade = cv.CascadeClassifier('haarcascade_eye.xml')
img = cv.imread(sys.argv[1])
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
faces = face_cascade.detectMultiScale(gray, 1.3, 10)
if len(faces)==1:
	for (x,y,w,h) in faces:
	    cv.rectangle(img,(x-(w//2),y-(h//3)),(x+(3*w//2),y+(3*h//2)),(255,0,0),2)
	    roi_gray = gray[y:y+h, x:x+w]
	    roi_color = img[y:y+h, x:x+w]
	    rect_img = img[y-(h//3) : y+(3*h//2), x-(w//2): x+(3*w//2)]
	    # rect_img[:] = 0 
	    print("No or Multile Faces Found!!!Upload Correct Image!!!")
	    cv.imshow('aft', rect_img)
	    cv.waitKey(0)

else :
	print("No or Multile Faces Found!!!Upload Correct Image!!!")    
# cv.imshow('img',img)
  # modify value
# cv.imshow('aft', img)

