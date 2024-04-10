class CreateFeatures < ActiveRecord::Migration[7.1]
  def change
    create_table :features, id: :string do |t|
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
