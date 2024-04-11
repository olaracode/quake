class AddExternalIdToFeatures < ActiveRecord::Migration[7.1]
  def change
    drop_table :features

    create_table :features do |t|
      t.string :external_id
      t.float :mag
      t.string :place
      t.datetime :time
      t.string :url
      t.boolean :tsunami
      t.string :magType
      t.string :title
      t.float :longitude
      t.float :latitude
      t.timestamps
    end
  end
end
