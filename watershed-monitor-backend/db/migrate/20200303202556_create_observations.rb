class CreateObservations < ActiveRecord::Migration[6.0]
  def change
    create_table :observations do |t|
      t.string :name
      t.string :type
      t.string :description
      t.float :latitude
      t.float :longitude
      t.integer :map_id
      t.timestamps
    end
  end
end
