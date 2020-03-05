class CategorySerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :observations
end
