from rest_framework  import serializers

class CodeReviewSerializer(serializers.Serializer):
    language = serializers.ChoiceField(
        choices=["python", "javascript", "java", "c", "cpp", "go"],
        required=True
    )
    code = serializers.CharField(
        min_length = 1,
        max_length=20000,
        required=True
    )