from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import CodeReviewSerializer
from .prompt import build_code_review_prompt
from .gemini import review_code_with_gemini
from .utils import extract_json

# Create your views here.

class CodeReviewClass(APIView):
    """
    CodeSage AI - Phase 1  COde Review API
    """

    def post (self, request):
        serializer = CodeReviewSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "errors": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        data=serializer.validated_data
        prompt = build_code_review_prompt(
            language=data["language"],
            code=data["code"]
        )

        try:
            raw_response = review_code_with_gemini(prompt)
            review_data = extract_json(raw_response)

            return Response(
                {
                    "success": True,
                    "review": review_data
                },
                status=status.HTTP_200_OK
            )
        
        except Exception as e:
            return Response(
                {
                    "success": False,
                    "error": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
