import graphene
from graphene_django import DjangoObjectType
from graphene_django import DjangoListField
from .models import Quizzes, Category, Question, Answer


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = ("id","name")


class QuizzesType(DjangoObjectType):
    class Meta:
        model = Quizzes
        fields = ("id","title","category","quiz")


class QuestionType(DjangoObjectType):
    class Meta:
        model = Question
        fields = ("title","quiz")


class AnswerType(DjangoObjectType):
    class Meta:
        model = Answer
        fields = ("question","answer_text")


class Query(graphene.ObjectType):
    all_questions = graphene.Field(QuestionType, id=graphene.Int())
    all_answers = graphene.List(AnswerType, id=graphene.Int())

    def resolve_all_questions(self,info, id):
        return Question.objects.get(pk=id)

    def resolve_all_answers(self,info, id):
        return Answer.objects.filter(question=id)


# CREATE CATEGORY
class CategoryCreateMutation(graphene.Mutation):

    class Arguments:
        name = graphene.String(required = True)

    category = graphene.Field(CategoryType)

    @classmethod
    def mutate(cls, root, info ,name):
        category = Category(name=name)
        category.save()
        return CategoryCreateMutation(category=category)


# UPDATE CATEGORY
class CategoryUpdateMutation(graphene.Mutation):

    class Arguments:
        id = graphene.ID()
        name = graphene.String(required = True)

    category = graphene.Field(CategoryType)

    @classmethod
    def mutate(cls, root, info ,name,id):
        category = Category.objects.get(id=id)
        category.name= name
        category.save()
        return CategoryUpdateMutation(category=category)


#DELETE CATEGORY
class CategoryDeleteMutation(graphene.Mutation):

    class Arguments:
        id = graphene.ID()

    category = graphene.Field(CategoryType)

    @classmethod
    def mutate(cls, root, info,id):
        category = Category.objects.get(id=id)
        category.delete()
        return CategoryDeleteMutation(category=category)

class Mutation(graphene.ObjectType):

    create_category = CategoryCreateMutation.Field()
    update_category = CategoryUpdateMutation.Field()
    delete_category = CategoryDeleteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)