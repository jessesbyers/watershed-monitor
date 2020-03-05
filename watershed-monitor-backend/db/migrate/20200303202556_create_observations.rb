class CreateObservations < ActiveRecord::Migration[6.0]
  def change
    create_table :observations do |t|
      t.string :name
      t.string :description
      t.float :latitude
      t.float :longitude
      t.integer :category_id
      t.timestamps
    end
  end
end
