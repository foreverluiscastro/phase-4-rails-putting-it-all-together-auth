class RecipesController < ApplicationController

    # GET /recipes
    def index
        # byebug
        if !session[:user_id] == false
            user = User.find(session[:user_id])
            # byebug
            recipes = user.recipes
            render json: recipes, include: :user
        else
            render json: { errors: []}, status: :unauthorized
        end
    end

    # POST /recipes
    def create
        if !session[:user_id] == false
            user = User.find(session[:user_id])
            recipe = user.recipes.create(recipe_params)
            render json: recipe, include: :user, status: :created
        else
            render json: { errors: []}, status: :unauthorized
        end
    end

    private

    def recipe_params
        params.permit(:user_id, :title, :instructions, :minutes_to_complete)
    end


end
