class Observation < ApplicationRecord
    belongs_to :category
    validates :latitude, numericality: true
    validates :longitude, numericality: true
end
