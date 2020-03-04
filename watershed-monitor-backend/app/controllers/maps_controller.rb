class MapsController < ApplicationController

    def index
        maps = Map.all 
        render json: MapSerializer.new(maps)
    end

    def show
        map = Map.find(params[:id])
        render json: MapSerializer.new(map)
    end
end