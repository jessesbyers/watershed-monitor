class CategoriesController < ApplicationController

    def index
        categories = Category.all 
        render json: CategorySerializer.new(categories)
    end

    def show
        map = Map.find(params[:id])
        render json: MapSerializer.new(map)
    end
end