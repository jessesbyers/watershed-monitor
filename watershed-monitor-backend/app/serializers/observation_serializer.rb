class ObservationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :category, :description, :latitude, :longitude, :map_id, :created_at, :map
end
