class ObservationsController < ApplicationController

    def new 
        observation = Observation.new
    end

    def create 
        observation = Observation.new(observation_params)
        observation.save
    end


    def index
        observations = Observation.all 
        render json: ObservationSerializer.new(observations)
    end

    def show
        observation = Observation.find(params[:id])
        render json: ObservationSerializer.new(observation)
    end

    private

    def observation_params
        params.require(:observation).permit(:name, :description, :category_id, :latitude, :longitude)
    end

end