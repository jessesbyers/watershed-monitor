class AddColumnsToMaps < ActiveRecord::Migration[6.0]
  def change
    add_column :maps, :latitude, :float
    add_column :maps, :longitude, :float
  end
end
