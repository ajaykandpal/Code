import boto3
import cv2,sys,os
import numpy as np

from PIL import Image
from matplotlib import cm
from scipy import ndimage

# Create an S3 client
bucket_name='sarikas3'
s3=boto3.client('s3')

head,tail=os.path.split(sys.argv[1])
result = [x.strip() for x in tail.split('.')]
x=sys.argv[2]+"_"+sys.argv[3]+"."+result[1]
path= 'Input/'+x
s3.upload_file(path, bucket_name, path)