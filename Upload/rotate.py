 
import cv2,sys
import numpy as np

from scipy import ndimage

#rotation angle in degree

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
# eye_cascade = cv.CascadeClassifier('haarcascade_eye.xml')
image = cv2.imread(sys.argv[1])

rotated90 = ndimage.rotate(image, 90)
head,tail=os.path.split(sys.argv[1])
 
# 180 degrees
# M = cv2.getRotationMatrix2D(center, angle180, scale)
rotated180 = ndimage.rotate(image, 180)
 
# 270 degrees
# M = cv2.getRotationMatrix2D(center, angle270, scale)
rotated270 =ndimage.rotate(image, 270)
flag=0
def my(img):
	copy=img.copy()
	gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	faces = face_cascade.detectMultiScale(gray, 1.3, 10)
	if len(faces)==1:
		global flag
		flag=1
		for (x,y,w,h) in faces:
		    cv2.rectangle(img,(x-(w//2),y-(h//3)),(x+(3*w//2),y+(3*h//2)),(255,0,0),2)
		    roi_gray = gray[y:y+h, x:x+w]
		    roi_color = img[y:y+h, x:x+w]
		    rect_img = img[y-(h//3) : y+(3*h//2), x-(w//2): x+(3*w//2)]
		    # rect_img[:] = 0 
		    cv2.imshow('aft', rect_img)
		    cv2.waitKey(0)
		    path= "Output/"+tail
		    path2= "Input/"+tail
		    cv2.imwrite(path,rect_img)
		    cv2.imwrite(path2,copy)
		    # cv2.imwrite(path+"_face",rect_img)

my(image)
if flag==0:
	my(rotated90)
	if flag==0:
		my(rotated180)
		if flag ==0:
			my(rotated270)
			

if flag==0:
	print("NO OR MULTIPLE FACES FOUND!!! UPLOAD CORRECT IMAGE!!!")
