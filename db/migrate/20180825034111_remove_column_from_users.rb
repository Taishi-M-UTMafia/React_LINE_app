class RemoveColumnFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :image_name, :string
    add_column :users, :image_name, :string, default: 'ninjawanko.png'
  end
end
