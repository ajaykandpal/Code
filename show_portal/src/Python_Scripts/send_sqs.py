import boto3
import cv2,sys,os
import numpy as np

from PIL import Image
from matplotlib import cm
from scipy import ndimage

#send url to sqs
sqs = boto3.client('sqs')
queue_url = 'https://sqs.ap-south-1.amazonaws.com/038577994797/demoqueue'

# Send message to SQS queue
lists = sys.argv[2]
response = sqs.send_message(
        QueueUrl=queue_url,
        DelaySeconds=10,
        MessageAttributes={
            'Title': {
            'DataType': 'String',
            'StringValue': 'The URL'
                    }
        },
        MessageBody=(
        sys.argv[1]+' =sarikas3/Input/'+sys.argv[1]+'_'+sys.argv[2]
        )
        )


