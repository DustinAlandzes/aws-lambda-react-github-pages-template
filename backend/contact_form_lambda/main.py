import json
import os
from typing import TypedDict, Any

import boto3
from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEvent
from aws_lambda_powertools.utilities.typing import LambdaContext
from mypy_boto3_sns.service_resource import SNSServiceResource
from pydantic import BaseModel


# APIGatewayProxyEvent
class ContactFormSubmission(BaseModel):
    name: str
    email: str
    body: str


class Response(TypedDict):
    statusCode: int
    success: bool


def handler(event: dict[str, Any], context: LambdaContext) -> Response:
    """Accepts input from a contact form and publishes it to an SNS topic.
    https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/sns.html
    https://docs.aws.amazon.com/sns/
    https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sns_topic

    see: main.tf for sns topic details
    """
    event = APIGatewayProxyEvent(event)
    sns: SNSServiceResource = boto3.resource("sns", region_name="us-east-1")
    sns_topic_arn: str = os.environ["SNS_TOPIC_ARN"]
    topic: sns.Topic = sns.Topic(sns_topic_arn)
    body = json.loads(event.body)
    topic.publish(
        Message=f"""
        Name: {body['name']}
        Email: {body['email']}
        Body: {body['body']}
    """
    )

    # if everything goes well, return a 200 status and success: true
    return {
        "statusCode": 200,
        "success": True,
    }
