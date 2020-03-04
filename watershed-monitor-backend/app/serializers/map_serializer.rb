class MapSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :observations
end
