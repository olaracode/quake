class RenameSismosToFeatures < ActiveRecord::Migration[7.1]
  def change
    rename_table :sismos, :features
  end
end