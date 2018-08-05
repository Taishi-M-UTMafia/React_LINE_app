class AddColumnToFriendship < ActiveRecord::Migration
  def change
    add_column :friendships, :friendship_id, :string
  end
end
