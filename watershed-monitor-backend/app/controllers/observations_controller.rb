class ObservationsController < ApplicationController

    def index
        observations = Observation.all 
        render json: ObservationSerializer.new(observations)
    end

    def show
        observation = Observation.find(params[:id])
        render json: ObservationSerializer.new(observation)
    end

end