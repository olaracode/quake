class ChangeForeignKeyForComments < ActiveRecord::Migration[7.1]
  def change
    rename_column :comments, :sismo_id, :feature_id
  end
end