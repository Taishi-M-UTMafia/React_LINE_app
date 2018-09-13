class RemoveDefault < ActiveRecord::Migration
  def change
    change_column_default :users, :image_name, nil
  end
end
