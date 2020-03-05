class ObservationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :latitude, :longitude, :category_id, :created_at, :category
end
